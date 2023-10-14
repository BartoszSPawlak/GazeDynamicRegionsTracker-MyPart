//var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddCors();//options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//                      policy =>
//                      {
//                          policy.WithOrigins("http://example.com",
//                                              "http://www.contoso.com",
//                                              "https://localhost:44333/")
//                                              .AllowAnyHeader()
//                                              .AllowAnyMethod();
//                      });
//});

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

//app.UseCors(MyAllowSpecificOrigins);
//app.UseCors(options =>
//{
//    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
//});

Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("en-GB");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Main}/{action=Main}/{id?}");

app.Run();
