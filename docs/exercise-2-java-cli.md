# Exercise 2: CVE Detection & Security Hardening with CLI  (Optional)

**Duration**: 25 minutes  
**Difficulty**: ⭐⭐⭐⭐ Advanced  
**Prerequisites**: Exercise 1 completed (modernized Spring Boot 3.2 app)

## Overview

**The Challenge**: Before deploying the tournament service to production, Game Arena Legends security team requires zero critical CVEs. Hackers have been targeting esports platforms to manipulate tournament brackets and steal player data.

**Your Mission**: Use GitHub Copilot CLI with App Modernization MCP server to detect vulnerabilities, fix CVEs, and harden the application with security tests.


## Getting Started

Navigate to your modernized tournament service:

```bash
cd app-modernization-workshop/legacy-code/java-tournament-service
```

---

## Step 1: Add App Modernization MCP Server (5 min)

### Option 1: Interactive Setup (Recommended)

```bash
# Start Copilot CLI
copilot

# In the CLI, add MCP server
/mcp add app-modernization
```

Fill in the prompts:
- **Server Type**: `Local`
- **Command**: `npx -y @microsoft/github-copilot-app-modernization-mcp-server`
- **Environment Variables**: Leave empty (press Enter)
- **Tools**: `*` (default - all tools)
---

## Step 2: Create Security Hardening Agent (5 min)

### Create Custom Agent File

```bash
/agent
```

Select **"Manage agents"** → **"Create new agent"**

**Agent name**: `SecurityAgent`

**Note**: Select all app modernization tools if you couldnt complete exercise 1, otherwise select only security related tools:

**Agent content**:

```yaml
---
# For format details: https://gh.io/customagents/config
name: SecurityAgent
description: Detect CVEs and harden Java Spring Boot applications
tools: ['shell', 'read', 'edit', 'search', 'validate_cves_for_java', 'generate_upgrade_plan', 'generate_tests_for_java', 'build_java_project', 'run_tests_for_java']
---

# Security Agent

## Your Role
Detect and fix CVEs in Java Spring Boot applications, then harden with security tests.

## Workflow
1. **CVE Scan**: Use `validate_cves_for_java` to identify vulnerable dependencies
2. **Fix Vulnerabilities**: Use `generate_upgrade_plan` to update dependencies
3. **Security Tests**: Use `generate_tests_for_java` to add security test cases
4. **Validate Build**: Use `build_java_project` to compile with updated dependencies
5. **Run Tests**: Use `run_tests_for_java` to verify security tests pass

## Guidelines
- Fix critical and high severity CVEs first
- Test after each dependency change
- Generate tests for authentication, authorization, input validation
- Document all security changes
```


---

## Step 3: Run Security Agent (10 min)

### Select and Run the Custom Agent

```bash
/agent
```

Select **`SecurityAgent`** and provide this prompt:

```
Scan the tournament service for CVEs and security vulnerabilities.
Fix all critical and high severity issues by upgrading dependencies.
Generate comprehensive security tests covering:
- Input validation for tournament endpoints
- SQL injection prevention
- Authentication and authorization
Generate tests and run them to ensure everything works.
```
Select **`SecurityAgent`** and provide this prompt if you could not complete excercise 1:

```
Upgrade and Scan the tournament service for CVEs and security vulnerabilities.
Fix all critical and high severity issues by upgrading dependencies.
Generate comprehensive security tests covering:
- Input validation for tournament endpoints
- SQL injection prevention
- Authentication and authorization
Generate tests and run them to ensure everything works.
```

### What the Agent Will Do

The agent executes these MCP tools in sequence:

1. **`validate_cves_for_java`** - Scans dependencies and lists CVEs with severity
2. **`generate_upgrade_plan`** - Updates `pom.xml` with patched versions
3. **`generate_tests_for_java`** - Creates security tests in `src/test/java/security/`
4. **`build_java_project`** - Compiles with updated dependencies
5. **`run_tests_for_java`** - Executes all tests and confirms success

---

## Expected Output

**CVE Scan**: Lists vulnerabilities with severity (Critical, High, Medium, Low)  
**Dependency Updates**: `pom.xml` updated with patched versions  
**Security Tests**: Test files created in `src/test/java/security/`  
**Build & Test**: All tests pass with 0 critical CVEs remaining

---

## Key Takeaways

**MCP Server** configured with specialized Java security tools  
**Custom Agent** created for reusable security workflows  
**CVE Detection** automated with `validate_cves_for_java`  
**Dependency Upgrades** safely applied via `generate_upgrade_plan`  
**Security Tests** AI-generated with `generate_tests_for_java`  
**CLI Automation** completes security hardening in minutes

---

## Additional Resources

- [GitHub Copilot CLI Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line)
- [Custom Agents Guide](https://gh.io/customagents/config)
- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)
- [App Modernization MCP Server](https://learn.microsoft.com/en-us/azure/developer/java/migration/github-copilot-app-modernization-for-java-copilot-cli)

---

## Next Steps

**Continue the workshop:**

**[Exercise 3: .NET Framework Modernization →](exercise-3-dotnet.md)**
- Migrate .NET Framework 4.8 → .NET 8
- Convert Web API to minimal APIs
- Update Entity Framework → EF Core
- **Duration**: 30 minutes

---

**Achievement Unlocked: Security Hardening Expert!**

You've successfully hardened the tournament service using Copilot CLI with MCP server tools and custom agents. The application is now production-ready with zero critical CVEs!



---
