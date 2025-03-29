---
title: Building an End-to-End ML Pipeline with Databricks
description: A step-by-step tutorial for implementing a production-ready machine learning pipeline using Databricks.
date: May 28, 2023
category: Tutorials
estimatedTime: 35
skill_level: Intermediate
---

# Building an End-to-End ML Pipeline with Databricks

Databricks provides a unified analytics platform that makes it easier to build and deploy machine learning pipelines. This tutorial walks you through creating an end-to-end ML pipeline from data ingestion to model deployment.

## Overview

In this tutorial, you'll learn how to:

- Set up a Databricks workspace and cluster
- Ingest and prepare data for machine learning
- Build and train machine learning models using MLflow
- Create an automated pipeline for model deployment
- Monitor and maintain your models in production

## Prerequisites

Before you begin, make sure you have:

- A Databricks account with workspace access
- Basic understanding of Python and machine learning concepts
- Familiarity with PySpark and SQL
- A dataset you want to use for machine learning (or use one of Databricks' sample datasets)

## Setting up the environment

Follow these steps to set up your environment:

1. Log in to your Databricks workspace
2. Create a new cluster with the latest Databricks Runtime ML version
3. Install any additional libraries you might need

> [!NOTE]
> Databricks Runtime ML already includes popular libraries like scikit-learn, TensorFlow, PyTorch, and XGBoost, so you don't need to install them separately.

## Step 1: Create a workspace and notebook

1. In the Databricks sidebar, click on "Workspace"
2. Navigate to a folder or create a new one
3. Click on "Create" and select "Notebook"
4. Give your notebook a name like "ML Pipeline Tutorial"
5. Select Python as the language
6. Attach your notebook to the cluster you created earlier

## Step 2: Data ingestion and preparation

First, let's ingest some data. In this example, we'll use a sample dataset available in Databricks.

```python
# Load a sample dataset (flight delay data)
flight_df = spark.read.format("csv") \
  .option("header", "true") \
  .option("inferSchema", "true") \
  .load("/databricks-datasets/flights/departuredelays.csv")

# Display the first few rows
display(flight_df.limit(5))
```

Now, let's prepare our data for machine learning:

```python
# Data cleaning and feature engineering
from pyspark.sql.functions import col, when, hour, dayofweek, month

# Convert delay column to binary classification target (delayed or not)
flight_df = flight_df.withColumn("delayed", when(col("delay") > 15, 1).otherwise(0))

# Extract time-based features
flight_df = flight_df \
  .withColumn("hour_of_day", hour(col("date"))) \
  .withColumn("day_of_week", dayofweek(col("date"))) \
  .withColumn("month", month(col("date")))

# Select relevant columns for modeling
model_df = flight_df.select("origin", "destination", "carrier", 
                            "hour_of_day", "day_of_week", "month", "delayed")

# Split data into train and test sets
train_df, test_df = model_df.randomSplit([0.8, 0.2], seed=42)
```

> [!TIP]
> Always examine your data distribution and handle missing values before proceeding to model training. You can use `display(model_df.summary())` to get basic statistics about your features.

## Step 3: Build and train ML models with MLflow

Databricks integrates seamlessly with MLflow, which helps you track experiments, package code into reproducible runs, and share and deploy models.

```python
import mlflow
import mlflow.sklearn
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from pyspark.ml.feature import StringIndexer, OneHotEncoder, VectorAssembler
from pyspark.ml import Pipeline

# Convert categorical columns to numeric
categorical_cols = ["origin", "destination", "carrier"]
numeric_cols = ["hour_of_day", "day_of_week", "month"]

indexers = [StringIndexer(inputCol=col, outputCol=col+"_index").fit(train_df) for col in categorical_cols]
encoders = [OneHotEncoder(inputCol=col+"_index", outputCol=col+"_encoded") for col in categorical_cols]

# Create feature vector
encoded_cols = [col+"_encoded" for col in categorical_cols]
assembler = VectorAssembler(inputCols=encoded_cols + numeric_cols, outputCol="features")

# Define pipeline
pipeline = Pipeline(stages=indexers + encoders + [assembler])

# Prepare data for scikit-learn
pipeline_model = pipeline.fit(train_df)
train_data = pipeline_model.transform(train_df)
test_data = pipeline_model.transform(test_df)

# Convert to pandas for scikit-learn
train_pd = train_data.select("features", "delayed").toPandas()
test_pd = test_data.select("features", "delayed").toPandas()

X_train = np.stack(train_pd["features"].to_numpy())
y_train = train_pd["delayed"].to_numpy()
X_test = np.stack(test_pd["features"].to_numpy())
y_test = test_pd["delayed"].to_numpy()

# Start MLflow tracking
mlflow.set_experiment("/Users/your-username/flight-delay-prediction")

with mlflow.start_run(run_name="random_forest_classifier") as run:
    # Train model
    rf = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    rf.fit(X_train, y_train)
    
    # Make predictions
    y_pred = rf.predict(X_test)
    
    # Log metrics
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    mlflow.log_param("n_estimators", 100)
    mlflow.log_param("max_depth", 10)
    mlflow.log_metric("accuracy", accuracy)
    mlflow.log_metric("precision", precision)
    mlflow.log_metric("recall", recall)
    mlflow.log_metric("f1_score", f1)
    
    # Log model
    mlflow.sklearn.log_model(rf, "random_forest_model")
    
    print(f"Model accuracy: {accuracy:.4f}")
    print(f"Model precision: {precision:.4f}")
    print(f"Model recall: {recall:.4f}")
    print(f"Model F1 score: {f1:.4f}")
```

> [!WARNING]
> When training large models, make sure your cluster has sufficient resources. If you're experiencing issues, consider increasing the number of workers or choosing a more powerful instance type.

## Step 4: Create an automated pipeline with Databricks Jobs

Now that we have a trained model, let's automate our pipeline using Databricks Jobs:

1. In your Databricks workspace, click on "Jobs" in the sidebar
2. Click "Create Job" and provide a name like "Flight Delay Prediction Pipeline"
3. Add a task with the notebook we created
4. Configure the job to run on a schedule (e.g., daily at midnight)
5. Click "Create"

Your machine learning pipeline will now run automatically according to the schedule you set, ensuring your model is regularly updated with new data.

To programmatically create this job, you can use the Databricks API:

```python
import requests

API_URL = "https://your-databricks-instance/api/2.0/jobs/create"
TOKEN = "your-personal-access-token"

job_config = {
    "name": "Flight Delay Prediction Pipeline",
    "existing_cluster_id": "your-cluster-id",
    "notebook_task": {
        "notebook_path": "/Users/your-username/ML Pipeline Tutorial"
    },
    "schedule": {
        "quartz_cron_expression": "0 0 0 * * ?",  # Daily at midnight
        "timezone_id": "UTC"
    }
}

response = requests.post(
    API_URL,
    headers={"Authorization": f"Bearer {TOKEN}"},
    json=job_config
)

print(response.json())
```

## Step 5: Deploy and serve your model

Databricks offers several ways to deploy your model, including MLflow Model Serving, Databricks Model Serving, or exporting to external services.

Here's how to register your model in the MLflow Model Registry:

```python
from mlflow.tracking import MlflowClient

client = MlflowClient()

# Register the model
model_uri = f"runs:/{run.info.run_id}/random_forest_model"
mv = mlflow.register_model(model_uri, "flight_delay_predictor")

# Set model to Production stage
client.transition_model_version_stage(
    name="flight_delay_predictor",
    version=mv.version,
    stage="Production"
)

print(f"Model {mv.name} version {mv.version} is now in Production stage")
```

To serve the model for real-time inference:

1. Go to the "Models" section in your Databricks workspace
2. Find your registered model "flight_delay_predictor"
3. Click on the version in Production stage
4. Click "Enable Serving" and configure as needed

## Conclusion

Congratulations! You've built an end-to-end machine learning pipeline on Databricks that:

- Ingests and prepares data for model training
- Trains a machine learning model and tracks experiments with MLflow
- Automates the pipeline with Databricks Jobs
- Deploys the model for real-time inference

This workflow provides a solid foundation for developing production-grade machine learning applications. As you get more comfortable, consider exploring:

- Hyperparameter tuning to optimize model performance
- Feature stores for better feature reuse and management
- Model monitoring for detecting data drift and model performance degradation
- A/B testing for comparing different model versions

> [!NOTE]
> Databricks is continuously evolving its machine learning capabilities. Check the official documentation for the latest features and best practices.