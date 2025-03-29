---
title: Create a Microsoft Fabric Lakehouse
description: Learn how to create and configure a Microsoft Fabric lakehouse to store, process, and analyze large volumes of data using Delta tables and SQL queries.
date: March 15, 2023
category: Tutorials
estimatedTime: 30
skill_level: Intermediate
---

# Create a Microsoft Fabric Lakehouse

## Overview

Large-scale data analytics solutions have traditionally been built around a data warehouse, in which data is stored in relational tables and queried using SQL. The growth in "big data" (characterized by high volumes, variety, and velocity of new data assets) together with the availability of low-cost storage and cloud-scale distributed compute technologies has led to an approach to analytical data in which, the data itself is often stored in files in a data lake, rather than imposed with a fixed schema.

However, many data engineers and analysts need to benefit from the best features of both of these approaches by combining them in a data lakehouse; in which data is stored in files in a data lake and a relational schema is applied to them as a metadata layer so that they can be queried using traditional SQL semantics.

## Prerequisites

To complete this exercise, you will need:

* Access to a Microsoft Fabric environment
* Basic understanding of SQL concepts
* Understanding of data lakes and warehouses

> [!NOTE]
> This lab takes approximately 30 minutes to complete.

## Setting up the environment

In Microsoft Fabric, a lakehouse provides highly scalable file storage in a OneLake store (built on Azure Data Lake Store Gen2) with a metadata for relational objects such as tables and views based on the open source Delta Lake table format. Delta Lake enables you to define a schema of tables in your lakehouse that you can query using SQL.

> [!WARNING]
> You need a Microsoft Fabric trial to complete this exercise.

## Create a workspace

Before working with data in Fabric, create a workspace with the Fabric trial enabled.

### Navigate to the Microsoft Fabric home page

Go to [https://app.fabric.microsoft.com](https://app.fabric.microsoft.com) in a browser, and sign in with your Fabric credentials.

### Select Workspaces

In the menu bar on the left, select **Workspaces** (the icon looks similar to ⬡).

### Create a new workspace

Create a new workspace with a name of your choice, selecting a licensing mode in the **Advanced** section that includes Fabric capacity (Trial, Premium, or Fabric).

```powershell
# Example PowerShell command (if using automation)
New-FabricWorkspace -Name "DataAnalytics-Workshop" -CapacityType "Trial"
```

### Verify the workspace

When your new workspace opens, it should be empty. You'll now create a Data Engineering experience in this workspace.

![Empty Fabric workspace](https://microsoftlearning.github.io/mslearn-fabric/Instructions/Labs/images/create-workspace.png)

## Create a lakehouse

Now that you have a workspace, it's time to create a lakehouse to store your data.

### Create a new lakehouse

In your Fabric workspace:

1. Select the **Data Engineering** experience from the experience switcher at the bottom left.
2. On the Data Engineering home page, select the **Lakehouse** tile to create a new lakehouse.
3. In the **New lakehouse** dialog box, enter the name "Data-Lakehouse" for your lakehouse, then select **Create**.

> [!TIP]
> Creating a lakehouse provisions both a storage layer and a compute engine, allowing you to immediately start querying and analyzing data.

### Explore the lakehouse interface

After a few seconds, a new lakehouse will be created and its interface will be displayed. You should see something like this:

![New lakehouse interface](https://microsoftlearning.github.io/mslearn-fabric/Instructions/Labs/images/new-lakehouse.png)

The lakehouse interface includes:
* A **Tables** folder where you can define and work with tables
* A **Files** section where you can explore the underlying files in the lakehouse
* A query pane where you can run SQL code against the tables

## Load and query data

### Upload a sample file

Let's load some data into the lakehouse:

1. Download the [sample data file](https://aka.ms/fabric-lakehouse-data) to your local machine.
2. In the lakehouse interface, select the **Files** section.
3. On the toolbar, select **Upload** -> **Upload files**.
4. Browse to and select the downloaded data file, then click **Open**.

```sql
-- Example SQL query to view the table after loading
SELECT TOP 100 * FROM sales_data;
```

### Create a table from the file

Now that we have a file in our lakehouse, let's create a table from it:

1. Right-click the uploaded file and select **Load to Tables**.
2. In the dialog box, accept the default settings and select **Load**.

> [!NOTE]
> The data is being loaded into a Delta table. Delta provides transaction logs, data versioning, and other advanced features.

## Visualize results

### Query the data

Now that we have a table, let's query it:

```sql
SELECT 
  YEAR(OrderDate) AS Year,
  MONTH(OrderDate) AS Month,
  SUM(SalesAmount) AS TotalSales
FROM 
  sales_data
GROUP BY 
  YEAR(OrderDate),
  MONTH(OrderDate)
ORDER BY 
  Year, Month;
```

### Create a visualization

Let's turn these results into a visualization:

1. Run the query above.
2. After the results appear, select the **Chart** view.
3. Choose **Line chart** as the visualization type.
4. Configure the chart settings:
   * X-axis: Month
   * Y-axis: TotalSales
   * Legend: Year

![Sales visualization](https://microsoftlearning.github.io/mslearn-fabric/Instructions/Labs/images/sales-visualization.png)

## Conclusion

In this exercise, you explored how to create a lakehouse in Microsoft Fabric. You learned how to:

* Create a workspace with Fabric enabled
* Create a lakehouse to store data
* Upload files to the lakehouse
* Create tables from the files
* Query and visualize the data

Lakehouses combine the best features of data lakes and data warehouses, providing both the flexibility of files and the structure of tables. This allows you to work with your data using familiar SQL semantics while maintaining the advantages of a data lake architecture.

## Further Learning

To learn more about Microsoft Fabric lakehouses, explore these resources:

* [Microsoft Fabric documentation](https://learn.microsoft.com/fabric/)
* [Delta Lake documentation](https://delta.io/)
* [Advanced data engineering in Fabric](https://learn.microsoft.com/fabric/data-engineering/)