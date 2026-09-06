using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var locales = new Dictionary<string, SiteContent>(StringComparer.OrdinalIgnoreCase);
foreach (var (locale, fileName) in new[] { ("en", "site.json"), ("sr", "site.sr.json") })
{
    var dataPath = Path.Combine(builder.Environment.ContentRootPath, "Data", fileName);
    locales[locale] = JsonSerializer.Deserialize<SiteContent>(File.ReadAllText(dataPath), new JsonSerializerOptions(JsonSerializerDefaults.Web))
        ?? throw new InvalidOperationException($"Content for {locale} could not be loaded.");
}
SiteContent ContentFor(string? locale, HttpResponse response)
{
    var selected = locale is not null && locales.ContainsKey(locale) ? locale.ToLowerInvariant() : "en";
    response.Headers.ContentLanguage = selected == "sr" ? "sr-Latn" : "en";
    return locales[selected];
}
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
app.MapGet("/api/site", (string? locale, HttpResponse response) => Results.Ok(ContentFor(locale, response).Profile));
app.MapGet("/api/programs", (string? locale, HttpResponse response) => Results.Ok(ContentFor(locale, response).Programs));
app.MapGet("/api/programs/{id}", (string id, string? locale, HttpResponse response) =>
    ContentFor(locale, response).Programs.FirstOrDefault(p => p.Id == id) is { } program
        ? Results.Ok(program) : Results.NotFound(new { message = "Program not found." }));
app.Map("/api/{**path}", () => Results.NotFound(new { message = "API endpoint not found." }));
app.MapFallbackToFile("index.html");
app.Run();

record SiteContent(TrainerProfile Profile, TrainingProgram[] Programs);
record TrainerProfile(string Description, string Quote, string QuoteAttribution);
record TrainingProgram(string Id, string Category, string Symbol, string Label, string Name,
    string Description, string[] Features, string SuitedFor, bool Featured);
