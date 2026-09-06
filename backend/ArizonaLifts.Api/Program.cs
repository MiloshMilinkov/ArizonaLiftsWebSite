using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var dataPath = Path.Combine(builder.Environment.ContentRootPath, "Data", "site.json");
var content = JsonSerializer.Deserialize<SiteContent>(File.ReadAllText(dataPath), new JsonSerializerOptions(JsonSerializerDefaults.Web))
    ?? throw new InvalidOperationException("Site content could not be loaded.");
var app = builder.Build();
app.UseExceptionHandler(handler => handler.Run(async context =>
{
    context.Response.StatusCode = 500;
    await context.Response.WriteAsJsonAsync(new { message = "An unexpected error occurred." });
}));
app.Use(async (context, next) =>
{
    context.Response.Headers.XContentTypeOptions = "nosniff";
    context.Response.Headers["Referrer-Policy"] = "strict-origin-when-cross-origin";
    context.Response.Headers["X-Frame-Options"] = "DENY";
    await next();
});
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapGet("/api/health", () => Results.Ok(new { status = "healthy" }));
app.MapGet("/api/site", () => Results.Ok(content.Profile));
app.MapGet("/api/programs", () => Results.Ok(content.Programs));
app.MapGet("/api/programs/{id}", (string id) =>
    content.Programs.FirstOrDefault(p => p.Id == id) is { } program
        ? Results.Ok(program) : Results.NotFound(new { message = "Program not found." }));
app.Map("/api/{**path}", () => Results.NotFound(new { message = "API endpoint not found." }));
app.MapFallbackToFile("index.html");
app.Run();

record SiteContent(TrainerProfile Profile, TrainingProgram[] Programs);
record TrainerProfile(string Description, string Quote, string QuoteAttribution);
record TrainingProgram(string Id, string Category, string Symbol, string Label, string Name,
    string Description, string[] Features, string SuitedFor, bool Featured);
