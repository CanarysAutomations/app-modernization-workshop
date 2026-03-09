# Exercise 2.1: .NET Player Stats API Modernization with GitHub Coding Agent ⚡ (Optional)

**Duration**: 25 minutes  
**Difficulty**: ⭐⭐⭐⭐ Advanced  
**Prerequisites**: GitHub Enterprise with MCP Server access, Repository admin access, GitHub Copilot Pro+
**Note**: This is an advanced optional exercise using GitHub Copilot Coding Agent. Complete Exercise 2 first for the foundational local agent approach.

## 🎮 The Challenge

The **Player Stats API** tracks player performance, rankings, match history, and achievements across all Game Arena Legends tournaments. Built with **.NET Framework 4.8**, it's struggling to keep up:

- ASP.NET Web API 2 controllers with blocking I/O
- Entity Framework 6 with slow LINQ queries
- No support for modern minimal APIs
- Cannot deploy to containers or cloud-native platforms
- Security vulnerabilities in old .NET Framework

Your mission: **Use GitHub Copilot Coding Agent to autonomously migrate to .NET 8 with minimal APIs, Entity Framework Core, and cloud-ready architecture.**

## 🚀 Step-by-Step Guide

The **GitHub Copilot Coding Agent** is a cloud-based autonomous agent that modernizes .NET projects via GitHub Issues and Pull Requests.

### Step 1: Push Legacy Code to GitHub Repository (3 minutes)

1. **Create a new GitHub repository:**
   ```bash
   # Navigate to legacy code
   cd legacy-code/dotnet-stats-api
   
   # Initialize git and push to GitHub
   git init
   git add .
   git commit -m "Add legacy .NET Framework 4.8 Player Stats API"
   git remote add origin https://github.com/<your-org>/dotnet-stats-api.git
   git push -u origin main
   ```

### Step 2: Configure MCP Server in Repository Settings (5 minutes)

1. **Navigate to Repository Settings:**
   - Go to your GitHub repository
   - Click **Settings** → **Copilot** → **Coding Agent**

2. **Add MCP Server Configuration:**
   - Click **"Add MCP Server"**
   - Add the following JSON configuration (from [official Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/azure/migration/appmod/coding-agent-support)):
   ```json
   {
     "mcpServers": {
       "DotNetAppModMcpServer-migrate": {
         "type": "local",
         "command": "dnx",
         "tools": ["*"],
         "args": [
           "Microsoft.AppModernization.McpServer.DotNet.Migration",
           "--yes",
           "--source",
           "https://api.nuget.org/v3/index.json"
         ]
       }
     }
   }
   ```
   - Click **Save**
   
   > **Important**: The MCP server executes in the GitHub Copilot cloud environment. If you encounter errors like `spawn dnx ENOENT`, it means the MCP server tooling is not yet available in your GitHub organization. This requires GitHub Enterprise with App Modernization features enabled.

### Step 3: Create Custom Agent Profile (5 minutes)

1. **Create agent directory in your repository:**
   ```bash
   mkdir -p .github/agents
   ```

2. **Create `.github/agents/appmod-dotnet.agent.md`:**
   ```yaml
   ---
   name: dotnet-modernization
   description: Expert assistant for modernizing .NET applications with modern technologies and preparing them for Azure migration
   ---
   
   # .NET Modernization Assistant
   
   I am a specialized AI assistant for modernizing .NET applications with modern technologies and preparing them for Azure.
   
   ## What I Can Do
   
   - **Migration**: Execute structured migrations to modern technologies (logging, authentication, configuration, data access)
   - **Validation**: Run builds, tests, CVE checks, and consistency/completeness verification
   - **Tracking**: Maintain migration plans and progress
   - **Azure Preparation**: Modernize code patterns for cloud-native Azure deployment
   
   ## Migration Workflow
   
   ### 1. Planning Phase (REQUIRED FIRST STEP)
   Before any migration work, I will analyze the solution structure and dependencies.
   
   ### 2. Execution Phase
   Migration phases in order:
   1. **Analysis**: Analyze the solution structure and dependencies
   2. **Dependencies**: Update NuGet packages and project references
   3. **Configuration**: Migrate config files to appsettings.json
   4. **Code**: Transform code to modern .NET patterns (minimal APIs, EF Core)
   5. **Verification**:
     - ✅ Build verification
     - ✅ CVE vulnerability check
     - ✅ Unit test verification
   
   ### 3. Completion Phase
   Write a brief summary of the migration process with key changes and verification results.
   
   ## Core Principles
   
   -Execute actions directly via available tools
   - Track progress with Git commits
   - Complete ALL verification steps
   - Never skip validation
   
   **Ready to modernize your .NET applications?** Ask me to start a migration!
   ```

3. **Create `.github/copilot-setup-steps.yml`:**
   ```yaml
     - name: Set up .NET 10
       uses: actions/setup-dotnet@v5
       with:
         dotnet-version: '10.x'
   
     - name: Verify .NET 10
       run: |
         dotnet --info
   ```

4. **Commit and push agent configuration:**
   ```bash
   git add .github/
   git commit -m "Add Copilot Coding Agent configuration"
   git push
   ```

### Step 4: Create Modernization GitHub Issue (2 minutes)

1. **In your GitHub repository, create a new Issue:**
   - Click **Issues** → **New Issue**
   - **Title**: `Modernize Player Stats API to .NET 8`
   - **Description**:
   ```markdown
   @copilot @appmod-dotnet
   
   Please modernize the dotnet-stats-api project from .NET Framework 4.8 to .NET 8:
   
   **Assessment Phase:**
   - Analyze existing .NET Framework 4.8 codebase
   - Identify compatibility issues and migration complexity
   - Generate detailed migration plan with effort estimates
   
   **Migration Phase:**
   - Create new .NET 8 project structure
   - Migrate models to .NET 8 with nullable reference types
   - Convert DbContext from Entity Framework 6 to EF Core 8
   - Convert ASP.NET Web API 2 controllers to minimal APIs
   - Update all package references and dependencies
   
   **Validation Phase:**
   - Build project and ensure zero compilation errors
   - Run all unit tests and verify they pass
   - Check for security vulnerabilities (CVEs)
   - Validate API functionality remains intact
   
   **Deliverables:**
   - Create Pull Request with all modernized code
   - Include migration summary and test results
   - Document any breaking changes or manual steps required
   ```
   
2. **Click "Submit new issue"**

### Step 5: Monitor Agent Execution (5 minutes)

The Coding Agent will automatically:

1. **Assessment Phase** (~2 minutes):
   - Analyzes legacy .NET Framework 4.8 codebase
   - Evaluates compatibility with .NET 8
   - Generates detailed migration strategy
   - Posts assessment results as Issue comment

2. **Migration Phase** (~8 minutes):
   - Creates new .NET 8 project structure
   - Migrates `Player.cs` and `MatchHistory.cs` with modern C# patterns
   - Converts `StatsDbContext` from EF6 to EF Core 8
   - Transforms `PlayersController.cs` to minimal APIs in `Program.cs`
   - Updates `appsettings.json` and connection strings

3. **Validation Phase** (~3 minutes):
   - Builds project to verify compilation
   - Runs unit tests to ensure functionality
   - Scans for security vulnerabilities (CVEs)
   - Checks for migration warnings or errors

**View Progress:**
- Monitor Issue comments for real-time updates
- Agent posts status after each phase
- Check GitHub Actions tab for detailed logs

### Step 6: Review and Merge Pull Request (5 minutes)

1. **Agent Creates Pull Request:**
   - Automatically opens PR when modernization completes
   - PR title: `[Copilot Agent] Modernize to .NET 8`
   - Includes detailed description of all changes

2. **Review Generated Code:**

   **Models (Player.cs):**
   ```csharp
   namespace PlayerStatsAPI.Models;  // File-scoped namespace
   
   [Table("Players")]
   public class Player
   {
       [Key]
       public int Id { get; set; }
   
       [Required]
       [MaxLength(100)]
       public string Username { get; set; } = string.Empty;  // Nullable reference types
       
       [Required]
       [EmailAddress]
       public string Email { get; set; } = string.Empty;
       
       public decimal WinRate => TotalMatches > 0 ? (decimal)Wins / TotalMatches * 100 : 0;
       
       public ICollection<MatchHistory> MatchHistories { get; set; } = new List<MatchHistory>();
   }
   ```

   **DbContext (StatsDbContext.cs):**
   ```csharp
   using Microsoft.EntityFrameworkCore;
   
   namespace PlayerStatsAPI.Data;
   
   public class StatsDbContext : DbContext
   {
       public StatsDbContext(DbContextOptions<StatsDbContext> options) : base(options) { }
   
       public DbSet<Player> Players => Set<Player>();
       public DbSet<MatchHistory> MatchHistories => Set<MatchHistory>();
   
       protected override void OnModelCreating(ModelBuilder modelBuilder)
       {
           modelBuilder.Entity<Player>()
               .HasMany(p => p.MatchHistories)
               .WithOne(m => m.Player)
               .HasForeignKey(m => m.PlayerId)
               .OnDelete(DeleteBehavior.Cascade);
       }
   }
   ```

   **Minimal APIs (Program.cs):**
   ```csharp
   var builder = WebApplication.CreateBuilder(args);
   
   builder.Services.AddDbContext<StatsDbContext>(options =>
       options.UseInMemoryDatabase("GameArenaStats"));
   builder.Services.AddEndpointsApiExplorer();
   builder.Services.AddSwaggerGen();
   
   var app = builder.Build();
   
   if (app.Environment.IsDevelopment())
   {
       app.UseSwagger();
       app.UseSwaggerUI();
   }
   
   // GET all players
   app.MapGet("/api/players", async (StatsDbContext db) =>
       Results.Ok(await db.Players.Include(p => p.MatchHistories).ToListAsync()))
       .WithOpenApi();
   
   // GET player by ID
   app.MapGet("/api/players/{id:int}", async (int id, StatsDbContext db) =>
   {
       var player = await db.Players.Include(p => p.MatchHistories)
           .FirstOrDefaultAsync(p => p.Id == id);
       return player is not null ? Results.Ok(player) : Results.NotFound();
   })
   .WithOpenApi();
   
   // POST create player
   app.MapPost("/api/players", async (Player player, StatsDbContext db) =>
   {
       db.Players.Add(player);
       await db.SaveChangesAsync();
       return Results.Created($"/api/players/{player.Id}", player);
   })
   .WithOpenApi();
   
   // PUT update player
   app.MapPut("/api/players/{id:int}", async (int id, Player updatedPlayer, StatsDbContext db) =>
   {
       var player = await db.Players.FindAsync(id);
       if (player is null) return Results.NotFound();
   
       player.Username = updatedPlayer.Username;
       player.Email = updatedPlayer.Email;
       player.EloRating = updatedPlayer.EloRating;
       await db.SaveChangesAsync();
       return Results.Ok(player);
   })
   .WithOpenApi();
   
   // DELETE player
   app.MapDelete("/api/players/{id:int}", async (int id, StatsDbContext db) =>
   {
       var player = await db.Players.FindAsync(id);
       if (player is null) return Results.NotFound();
   
       db.Players.Remove(player);
       await db.SaveChangesAsync();
       return Results.NoContent();
   })
   .WithOpenApi();
   
   app.Run();
   ```

3. **Check PR Summary:**
   ```
   ✅ MODERNIZATION COMPLETE
   
   Files Modified: 8
   Lines Added: 385
   Lines Removed: 687
   Code Reduction: 44%
   
   Changes:
   - .NET Framework 4.8 → .NET 8
   - EF 6 → EF Core 8
   - ASP.NET Web API 2 → Minimal APIs
   - Traditional namespaces → File-scoped
   - Nullable reference types enabled
   
   Build: ✅ Success
   Tests: ✅ All Passed (12/12)
   CVE Scan: ✅ No critical vulnerabilities
   ```

4. **Approve and Merge:**
   - Review all file changes in PR
   - Click **"Approve"**
   - Click **"Merge pull request"**

## ✅ Success Criteria

Your modernization is complete when:

- [ ] GitHub Coding Agent successfully completed assessment
- [ ] Pull Request created with all modernized code
- [ ] Application runs on .NET 8
- [ ] All minimal API endpoints functional
- [ ] EF Core successfully manages database operations
- [ ] Build passes with zero compilation errors ✅
- [ ] All unit tests pass ✅
- [ ] CVE security scan shows no critical vulnerabilities ✅
- [ ] No .NET Framework dependencies remain

## 🎯 Validation Commands

```bash
# Clone the modernized code from PR branch
git fetch origin
git checkout <pr-branch-name>

# Build
dotnet build

# Run tests
dotnet test

# Check for .NET 8
dotnet --list-sdks

# Run the application
dotnet run

# Publish for production
dotnet publish -c Release
```

## 🐛 Troubleshooting

### Issue 1: Agent not responding to GitHub Issue
**Solution**: Verify agent configuration in repository settings
- Check MCP server is correctly configured
- Ensure agent profile exists in `.github/agents/`
- Verify `@copilot @appmod-dotnet` mention in issue

### Issue 2: Build failures during validation
**Solution**: Check agent logs in GitHub Actions
```bash
# Agent retries with fixes automatically
# Review detailed error logs in PR comments
```

### Issue 3: PR not created after issue completion
**Solution**: Check Issue comments for error messages
- Agent may have encountered blocking issues
- Review assessment results and address blockers
- Re-trigger by adding comment: `@copilot retry modernization`

## 🎓 Key Takeaways

✅ **GitHub Coding Agent** automates .NET modernization via autonomous workflows  
✅ **MCP tools** (assessment, build, test) provide end-to-end validation  
✅ **.NET 8 minimal APIs** reduce boilerplate by 60% vs. traditional controllers  
✅ **Issue-to-PR workflow** ensures traceability and reproducibility

## 📚 Additional Resources

- [GitHub Copilot Coding Agent Documentation](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-coding-agents)
- [.NET 8 Migration Guide](https://learn.microsoft.com/en-us/dotnet/core/porting/)
- [Minimal APIs Documentation](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [MCP Server Configuration](https://modelcontextprotocol.io/introduction)

## 🚀 Next Steps

Awesome work! You've modernized the Player Stats API using autonomous agents. Now move on to:

**[Exercise 3: Angular Frontend Modernization →](exercise-3-angular.md)**

Or explore bonus challenges:
- Configure agent to add JWT authentication
- Use agent to implement caching with Redis
- Automate deployment to Azure App Service via agent
- Scale modernization across multiple repositories

---

**⚡ Achievement Unlocked: Autonomous .NET Modernization Master!**
