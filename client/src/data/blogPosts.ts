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
    title: "Building an End-to-End ML Pipeline with Databricks",
    description: "A step-by-step tutorial for implementing a production-ready machine learning pipeline using Databricks.",
    date: "May 28, 2023",
    category: "Tutorials",
    image: "https://unsplash.com/photos/gray-laptop-computer-showing-codes-8bghKxNU1j0/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fG1hY2hpbmUlMjBsZWFybmluZ3xlbnwwfHx8fDE3MTczNzE0NTF8MA&force=true&w=1920",
    link: "/blog/building-ml-pipeline-databricks-tutorial"
  },
  {
    id: "3",
    title: "The Business Leader's Guide to Data Governance",
    description: "Understanding why data governance matters and how to implement it effectively in your organization.",
    date: "May 10, 2023",
    category: "Data Strategy",
    image: "https://unsplash.com/photos/people-sitting-on-chair-in-front-of-table-with-laptop-and-monitor-NBPhiA3UorA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8YnVzaW5lc3MlMjBsZWFkZXJ8ZW58MHx8fHwxNzE3MzcxNDcwfDA&force=true&w=1920",
    link: "/blog/business-leaders-guide-data-governance"
  },
  {
    id: "4",
    title: "Optimizing Snowflake Performance: Advanced Techniques",
    description: "Learn advanced techniques for optimizing query performance and managing costs in your Snowflake environment.",
    date: "April 22, 2023",
    category: "Snowflake",
    image: "https://unsplash.com/photos/person-looking-at-computer-monitor-8qEB0fTe9Vw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHNub3dmbGFrZSUyMGRhdGF8ZW58MHx8fHwxNzE3MzcxNjQ1fDA&force=true&w=1920",
    link: "/blog/optimizing-snowflake-performance"
  },
  {
    id: "5",
    title: "Ethical Considerations in AI Development",
    description: "Exploring the ethical challenges and best practices in developing artificial intelligence solutions.",
    date: "April 5, 2023",
    category: "AI & Ethics",
    image: "https://unsplash.com/photos/robot-toy-on-white-surface-734mbWSojr8/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8QUklMjBldGhpY3N8ZW58MHx8fHwxNzE3MzcxNjY1fDA&force=true&w=1920",
    link: "/blog/ethical-considerations-ai-development"
  },
  {
    id: "6",
    title: "Implementing a Data Mesh Architecture",
    description: "A comprehensive guide to implementing a data mesh architecture in your organization.",
    date: "March 18, 2023",
    category: "Data Architecture",
    image: "https://unsplash.com/photos/person-using-macbook-pro-on-brown-wooden-table-IgUR1iX0mqM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZGF0YSUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8fDE3MTczNzE2ODV8MA&force=true&w=1920",
    link: "/blog/implementing-data-mesh-architecture"
  },
  {
    id: "7",
    title: "Power BI vs. Tableau: Choosing the Right BI Tool",
    description: "A detailed comparison of two leading business intelligence platforms to help you make the right choice for your organization.",
    date: "March 3, 2023",
    category: "Business Intelligence",
    image: "https://unsplash.com/photos/woman-in-blue-shirt-sitting-beside-table-UBhpOIHnazM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8N3x8YnVzaW5lc3MlMjBpbnRlbGxpZ2VuY2V8ZW58MHx8fHwxNzE3MzcxNzA3fDA&force=true&w=1920",
    link: "/blog/power-bi-vs-tableau"
  },
  {
    id: "8",
    title: "Getting Started with Apache Spark on Databricks",
    description: "A beginner's guide to setting up and running Apache Spark workloads in the Databricks environment.",
    date: "February 14, 2023",
    category: "Tutorials",
    image: "https://unsplash.com/photos/person-typing-on-laptop-computer-b1Hg7QI-zcc/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8ZGF0YWJyaWNrc3xlbnwwfHx8fDE3MTczNzE3MjV8MA&force=true&w=1920",
    link: "/blog/getting-started-spark-databricks"
  },
  {
    id: "9",
    title: "5 AI Trends Reshaping Enterprise Data Analytics in 2023",
    description: "Explore the latest advancements in AI and how they're transforming how enterprises derive value from their data.",
    date: "June 15, 2023",
    category: "AI & Machine Learning",
    image: "https://unsplash.com/photos/people-sitting-on-chair-looking-at-the-person-standing-HyTwtsk8XqA/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8QUklMjB0cmVuZHN8ZW58MHx8fHwxNzE3MzcxNDIzfDA&force=true&w=1920",
    link: "/blog/ai-trends-reshaping-enterprise-data-analytics"
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
  "Data Strategy",
  "Snowflake",
  "AI & Ethics",
  "AI & Machine Learning",
  "Data Architecture",
  "Business Intelligence",
  "Security"
];

// Popular tags
export const popularTags = [
  "Microsoft Fabric",
  "Snowflake",
  "Databricks",
  "Power BI",
  "Tableau",
  "Data Mesh",
  "AI Ethics",
  "Machine Learning",
  "Data Governance",
  "Apache Spark"
];