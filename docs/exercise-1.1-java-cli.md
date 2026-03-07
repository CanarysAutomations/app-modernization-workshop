# Exercise 1.1: Migrate to Azure with Copilot CLI ☁️ (Optional)

**Duration**: 25 minutes  
**Difficulty**: ⭐⭐⭐⭐ Advanced  
**Prerequisites**: Exercise 1 completed (modernized Spring Boot 3.2 app)  


## 🎯 Overview

**Goal**: Deploy the modernized tournament service to Azure Spring Apps with Azure PostgreSQL database.


## 📋 Prerequisites

Before starting, ensure you have:

### 1. Completed Exercise 1
- ✅ Modernized Spring Boot 3.2 reactive application
- ✅ Code compiles and tests pass locally

### 2. Azure Account & Tools
```bash
# Install Azure CLI
# Windows
winget install Microsoft.AzureCLI

# macOS
brew update && brew install azure-cli

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Verify subscription
az account show
```

### 3. GitHub CLI with Copilot Extension
```bash
# Install GitHub CLI (if not installed)
# Windows
winget install GitHub.cli

# macOS
brew install gh

# Linux
sudo apt install gh

# Install Copilot extension
gh extension install github/gh-copilot
gh extension upgrade gh-copilot
```

### 2. Verify Installation
```bash
copilot --version
```

### 4. Required Tools
- **Java 17+** installed
- **Maven 3.8+** installed
- **Azure subscription** with permissions to create resources

## 🚀 Getting Started

### Step 1: Navigate to Modernized Code

```bash
# Navigate to your modernized app from Exercise 1
cd app-modernization-workshop/legacy-code/java-tournament-service

```



## 🔧 Setup: Add MCP Server (One-time)



### Add the App Modernization MCP Server

**Option 1: Using Copilot CLI Interactive Mode**

```bash
# Start Copilot CLI
copilot

# In Copilot CLI, run:
/mcp add app-modernization
```

Then fill in the fields:
- Server Type: **Local**
- Command: `npx -y @microsoft/github-copilot-app-modernization-mcp-server`
- Environment Variables: Leave empty
- Tools: Use default value `*`

**Option 2: Manual Configuration**

Create or update `~/.copilot/mcp-config.json`:

```json
{
  "mcpServers": {
    "app-modernization": {
      "command": "npx",
      "args": ["-y", "@microsoft/github-copilot-app-modernization-mcp-server"],
      "env": {},
      "disabled": false
    }
  }
}
```

## 🤖 Create Custom Agent for Azure Migration





### Step 1: Create Agent Directory

```bash
# Windows (PowerShell)
New-Item -Path "$HOME\.copilot\agents" -ItemType Directory -Force

# macOS/Linux
mkdir -p ~/.copilot/agents
```

### Step 2: Create Azure Migration Agent File

Create file: `~/.copilot/agents/azure-java-deploy.agent.md`

```yaml
---
# For format details: https://gh.io/customagents/config
name: AzureJavaDeployment
description: Deploy Java Spring Boot applications to Azure Spring Apps with PostgreSQL
tools: ['shell', 'read', 'edit', 'search', 'custom-agent', 'web', 'todo', 'app-modernization/*']
---

# Azure Java Deployment Agent

## Your Role
Deploy modernized Java Spring Boot applications to Azure Spring Apps with PostgreSQL.

## Deployment Steps
1. **Azure Setup**: Create resource group, Azure Spring Apps, PostgreSQL Flexible Server, Application Insights
2. **App Config**: Update application.properties for Azure PostgreSQL connection and monitoring
3. **Build**: Package application as JAR
4. **Deploy**: Deploy JAR to Azure Spring Apps with environment variables
5. **Validate**: Test health endpoints, API endpoints, check logs and monitoring

## Guidelines
- Use Azure CLI for all resource operations
- Follow Azure naming conventions
- Set environment variables for sensitive data
- Verify each phase before proceeding

```



## 📝 Migrate Your Application to Azure


### Step 1: Select Custom Agent

In Copilot CLI, type `/agent` to see available agents:

```
? Select Custom Agent
> 1. AzureJavaDeployment
  2. Cancel (Esc)

Confirm with number keys or ↑ / ↓ Keys and Enter, Cancel with Esc
```

Select `1` and press Enter and add this prompt:
```
Use the AzureJavaDeployment agent to deploy this Spring Boot 3.2 application 
to Azure Spring Apps with PostgreSQL in East US region, resource group 'tournament-service-rg'.
```

### Step 3: Provide Deployment Requirements

The agent will ask for Azure configuration. Provide:

```
Deploy this Spring Boot 3.2 application to Azure Spring Apps.
Resource group: tournament-service-rg
Region: eastus
Database: Azure PostgreSQL
Enable monitoring: yes
```

The agent will create resource group, provision Azure Spring Apps, PostgreSQL database, configure the application, build JAR, deploy, and validate deployment.

### Step 4: Monitor Deployment Progress

The agent will execute deployment in phases. You'll see progress for:

**Phase 1: Resource Creation**
```bash
az group create --name tournament-service-rg --location eastus
az spring create --name tournament-service-app ...
az postgres flexible-server create --name tournament-db-server ...
```

**Phase 2: Application Configuration**
```properties
# application-azure.properties
spring.r2dbc.url=r2dbc:pool:postgresql://[server].postgres.database.azure.com:5432/tournamentdb
spring.r2dbc.username=adminuser
```

**Phase 3: Build & Deploy**
```bash
mvn clean package -DskipTests
az spring app deploy --artifact-path target/*.jar ...
```

**Phase 4: Validation**
```bash
# Get app URL
az spring app show --query properties.url

# Test endpoints
curl https://[app-url]/actuator/health
curl https://[app-url]/api/tournaments
```

## ✅ Success Criteria

Your Azure migration is complete when:

- [ ] Azure resource group created successfully
- [ ] Azure Spring Apps instance is running
- [ ] Azure PostgreSQL database is provisioned and accessible
- [ ] Application JAR deployed to Azure Spring Apps
- [ ] Public URL assigned and accessible
- [ ] Health endpoint returns 200 OK
- [ ] API endpoints respond with data
- [ ] Application Insights receiving telemetry
- [ ] Logs streaming successfully

## 🎯 Validation Commands

```bash
# Verify resources
az resource list --resource-group tournament-service-rg --output table

# Get app URL
APP_URL=$(az spring app show \
  --name tournament-service \
  --resource-group tournament-service-rg \
  --service tournament-service-app \
  --query properties.url -o tsv)

# Test endpoints
curl https://$APP_URL/actuator/health
curl https://$APP_URL/api/tournaments

# Check logs
az spring app logs --name tournament-service \
  --resource-group tournament-service-rg \
  --service tournament-service-app --lines 50
```



## 🎓 Key Takeaways

1. **CLI Automation** - Copilot CLI enables scriptable, repeatable Azure migrations
2. **Custom Agents** - Define team-specific deployment workflows once, use everywhere
3. **MCP Superpowers** - MCP servers give Copilot specialized Azure tools
4. **Phased Deployment** - Break complex cloud migrations into validated phases
5. **Cloud Native** - Modernized app (Exercise 1) deploys seamlessly to Azure (Exercise 1.1)
6. **Enterprise Ready** - Custom agents standardize deployments across teams
7. **CI/CD Integration** - CLI approach can be automated in pipelines

## 📚 Additional Resources

- [GitHub Copilot CLI Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line)
- [Custom Agents Guide](https://gh.io/customagents/config)
- [Azure Spring Apps Documentation](https://learn.microsoft.com/en-us/azure/spring-apps/)
- [Azure PostgreSQL Flexible Server](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/)
- [Microsoft App Modernization for Java](https://learn.microsoft.com/en-us/azure/developer/java/migration/github-copilot-app-modernization-for-java-copilot-cli)

## 🚀 Next Steps

**Continue the workshop:**

**[Exercise 2: .NET Framework Modernization →](exercise-2-dotnet.md)**
- Migrate .NET Framework 4.8 → .NET 8
- Convert Web API to minimal APIs
- Update Entity Framework → EF Core
- **Duration**: 30 minutes

---

**🏆 Achievement Unlocked: Azure Migration Master!**

You've successfully deployed a modernized Spring Boot application to Azure using Copilot CLI with custom agents. This approach is ideal for team standardization, automation, and cloud-native deployments!

**What You Learned:**
- ✅ Copilot CLI automation (alternative to VS Code)
- ✅ Custom agents for specialized workflows
- ✅ MCP servers for extended capabilities
- ✅ Azure Spring Apps deployment
- ✅ Infrastructure as Code patterns

Now let's continue with .NET modernization!
