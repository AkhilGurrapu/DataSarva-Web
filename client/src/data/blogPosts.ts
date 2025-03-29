import { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Create a Microsoft Fabric Lakehouse",
    description: "Learn how to create and configure a Microsoft Fabric lakehouse to store, process, and analyze large volumes of data using Delta tables and SQL queries.",
    date: "March 15, 2023",
    category: "Tutorials",
    image: "https://microsoftlearning.github.io/mslearn-fabric/Instructions/Labs/images/fabric-homepage.png",
    link: "/blog/create-microsoft-fabric-lakehouse"
  },
  {
    id: "2",
    title: "Getting Started with Power BI Dashboards",
    description: "Discover how to create interactive Power BI dashboards that transform your data into actionable insights with custom visualizations.",
    date: "February 28, 2023",
    category: "Tutorials",
    image: "https://cdn.pixabay.com/photo/2017/01/29/13/21/analytics-2017980_1280.png",
    link: "/blog/power-bi-dashboards"
  },
  {
    id: "3",
    title: "Implementing Snowflake Data Warehouse",
    description: "A comprehensive guide to implementing a Snowflake data warehouse architecture for enterprise-grade analytics and reporting.",
    date: "January 12, 2023",
    category: "Implementation",
    image: "https://cdn.pixabay.com/photo/2016/12/11/08/01/data-mining-1898751_1280.jpg",
    link: "/blog/snowflake-data-warehouse"
  },
  {
    id: "4",
    title: "Using AI to Enhance Data Analytics Pipelines",
    description: "Explore how artificial intelligence can be integrated into your data analytics pipelines to improve efficiency and uncover deeper insights.",
    date: "December 5, 2022",
    category: "AI & ML",
    image: "https://cdn.pixabay.com/photo/2017/07/10/23/43/question-mark-2492009_1280.jpg",
    link: "/blog/ai-data-analytics"
  },
  {
    id: "5",
    title: "Data Governance Best Practices",
    description: "Learn essential data governance strategies to ensure data quality, security, and compliance across your organization.",
    date: "November 18, 2022",
    category: "Best Practices",
    image: "https://cdn.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg",
    link: "/blog/data-governance"
  },
  {
    id: "6",
    title: "Introduction to Databricks for Analytics",
    description: "Understand how Databricks provides a unified analytics platform for big data processing and machine learning at scale.",
    date: "October 30, 2022",
    category: "Tutorials",
    image: "https://cdn.pixabay.com/photo/2018/03/15/16/11/background-3229528_1280.jpg",
    link: "/blog/databricks-analytics"
  },
  {
    id: "7",
    title: "Real-time Analytics with Kafka and Spark",
    description: "Build a real-time analytics pipeline using Apache Kafka and Apache Spark for streaming data processing.",
    date: "September 14, 2022",
    category: "Implementation",
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    link: "/blog/real-time-analytics"
  },
  {
    id: "8",
    title: "Building a Data Mesh Architecture",
    description: "Explore the principles and implementation strategies for a modern data mesh architecture that enables domain-oriented data ownership.",
    date: "August 22, 2022",
    category: "Architecture",
    image: "https://cdn.pixabay.com/photo/2018/05/17/16/03/compass-3408928_1280.jpg",
    link: "/blog/data-mesh"
  },
  {
    id: "9",
    title: "Predictive Analytics for Business Forecasting",
    description: "Learn how to implement predictive analytics models to improve business forecasting and decision-making processes.",
    date: "July 7, 2022",
    category: "AI & ML",
    image: "https://cdn.pixabay.com/photo/2017/12/21/12/08/consulting-3031678_1280.jpg",
    link: "/blog/predictive-analytics"
  },
  {
    id: "10",
    title: "Securing Data in Multi-Cloud Environments",
    description: "Implement robust security measures to protect your data across multi-cloud environments while maintaining accessibility and compliance.",
    date: "June 19, 2022",
    category: "Security",
    image: "https://cdn.pixabay.com/photo/2016/11/29/06/46/office-1867761_1280.jpg",
    link: "/blog/multi-cloud-security"
  }
];

// Define learning paths
export const learningPaths = [
  {
    title: "Data Engineering Fundamentals",
    description: "Master the essentials of data engineering with hands-on tutorials covering ETL, data lakes, and warehousing.",
    skillLevel: "Beginner",
    modules: 8,
    hours: 12,
    icon: "Database"
  },
  {
    title: "Business Intelligence Practitioner",
    description: "Learn to build impactful dashboards and reports using the latest BI tools and visualization techniques.",
    skillLevel: "Intermediate",
    modules: 6,
    hours: 10,
    icon: "BarChart2"
  },
  {
    title: "AI and Machine Learning for Data",
    description: "Apply AI and ML algorithms to unlock predictive insights and automate data analysis workflows.",
    skillLevel: "Advanced",
    modules: 10,
    hours: 18,
    icon: "Brain"
  }
];

// Categories for filtering
export const categories = [
  "All Categories",
  "Tutorials",
  "Implementation",
  "AI & ML",
  "Architecture",
  "Best Practices",
  "Security"
];

// Popular tags
export const popularTags = [
  "Fabric",
  "Snowflake",
  "Databricks",
  "Power BI",
  "Data Lake",
  "ETL",
  "AI",
  "Machine Learning",
  "SQL",
  "Python"
];