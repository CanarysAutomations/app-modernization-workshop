# Exercise 4: DevOps & Data Engineering Pipeline with Custom Skill ⚙️📊

**Duration**: 20 minutes  
**Difficulty**: ⭐⭐⭐⭐ Advanced  
**Prerequisites**: Docker Desktop, Python 3.11+, GitHub account

## The Challenge

Game Arena Legends has **three modernized services** (Java, .NET, Angular) but no automation or data analytics. 

Your mission: **Create a custom DevOps skill, then use one prompt to containerize services, create CI/CD pipelines, and build a data engineering pipeline.**

## Prerequisites Check

Verify you have:
- Docker Desktop installed and running
- Python 3.11+ installed
- GitHub account with Actions enabled
- All three services from Exercises 1-3 completed

```bash
docker --version
python --version
```

## Three-Step Workflow

### Step 1: Create DevOps Engineering Skill (5 minutes)

1. **Create skill directory from Copilot Chat settings:**

![Skills folder structure](Assets/skills.png)

2. **Create `.github/skills/devops-engineer/SKILL.md` and paste this content:**

   ```markdown
   ---
   name: devops-engineer
   description: Containerizes microservices with Docker, creates GitHub Actions CI/CD workflows, and builds data engineering pipelines with Python for modern DevOps practices.
   ---

   # DevOps Engineering Expert

   You are a DevOps and data engineering specialist that containerizes applications, automates CI/CD, and builds data pipelines.

   ## Your Capabilities

   You can:
   - Create production-ready Dockerfiles with multi-stage builds
   - Set up GitHub Actions workflows for CI/CD
   - Build Python data pipelines with async operations
   - Implement security best practices (non-root users, Alpine images)
   - Optimize for performance and image size

   ## Workflow

   When asked to modernize DevOps infrastructure:

   1. **Containerization**:
      - Create multi-stage Dockerfiles for each service
      - Use appropriate base images (maven+temurin for Java, dotnet/sdk+aspnet for .NET, node:alpine for Angular)
      - Add non-root users for security
      - Optimize layer caching and image size
      - Expose appropriate ports

   2. **CI/CD Pipeline**:
      - Create `.github/workflows/main.yml` with:
        * Separate jobs for each service (Java, .NET, Angular)
        * Build and test steps with proper caching
        * Docker image builds
        * Security scanning (Trivy)
        * Conditional deployment to Azure Container Apps (main branch only)
        * Proper working-directory settings for each service path

   3. **Data Engineering**:
      - Create Python ETL scripts:
        * `extract.py`: Async data extraction with httpx and Polars
        * `transform.py`: Data transformation with computed columns
        * `requirements.txt`: Dependencies (httpx, polars, duckdb)
      - Use async/await patterns for performance
      - Save data as Parquet files for analytics
      - Include error handling and logging

   ## Success Criteria

   - All Dockerfiles build successfully with optimized layers
   - GitHub Actions workflow triggers on push/PR
   - Test jobs pass for all services
   - Security scans complete
   - ETL pipeline extracts and transforms data to Parquet
   - All containers run without errors
   ```

3. **Reload VS Code window** (Ctrl+Shift+P → "Developer: Reload Window")

### Step 2: Use Skill with One Prompt (1 minute)

**Open Copilot Chat** (Ctrl+Shift+I / Cmd+Shift+I) and use this prompt:

```
Using Skill #file:devops-engineer, containerize all three services (Java, .NET, Angular) with production Dockerfiles, create a GitHub Actions CI/CD workflow with build/test/deploy jobs, and build a Python ETL pipeline for data analytics.
```

### Step 3: Verify Results (14 minutes)

The skill will automatically generate:

**Dockerfiles Created:**
- `legacy-code/java-tournament-service/Dockerfile` - Multi-stage with Maven + Temurin
- `modernized-code/dotnet-stats-api/Dockerfile` - Multi-stage with .NET 8 SDK + runtime
- `modernized-code/angular-dashboard/Dockerfile` - Multi-stage with Node 20 + SSR

**CI/CD Workflow Created:**
- `.github/workflows/main.yml` - Separate jobs for Java, .NET, Angular build/test, security scan, and Azure deployment

**Data Pipeline Created:**
- `legacy-code/data-pipeline/extract.py` - Async data extraction with httpx and Polars
- `legacy-code/data-pipeline/transform.py` - Data transformation with computed columns
- `legacy-code/data-pipeline/requirements.txt` - Python dependencies




## 💡 What You Learned

- Creating custom DevOps skills with domain expertise
- Single-prompt workflow for multi-file infrastructure generation
- Automated containerization (Dockerfiles), CI/CD (GitHub Actions), and data pipelines (Python)
- Production best practices: multi-stage builds, security, optimization


---

**⚙️ Achievement Unlocked: DevOps & Data Engineering Expert!**

Congratulations! You've completed all 4 exercises and modernized the entire Game Arena Legends platform using different Copilot patterns:


**[← Back to Workshop Home](../README.md)**
