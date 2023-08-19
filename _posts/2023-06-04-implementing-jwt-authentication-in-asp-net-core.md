---
title: Implementing JWT authentication in ASP.NET Core
date: 2023-06-04
tags: authentication asp.net
---

In my previous article, I explored the fundamentals of JWT authentication. We delved into the structure of a token, and its benefits.
In this post, we will dive deeper into the practical implementation of JWT tokens. We'll be using ASP.NET Core 7 along with a controller-based API.

Throughout this article, I'll guide you through the necessary steps to integrate JWT authentication into your ASP.NET Core API. We'll explore how to generate and validate tokens, store user claims, and implement middle ware for token-based authentication. Additionally, we will highlight some best practices and considerations to ensure the security and integrity of your authentication system.

{: .box-note}
Note: For the purpose of this post, I'll be using the project template ASP.NET Core Web API and .NET 7

---

## NuGet Package - JwtBearer

First and foremost, we'll need to install the JwtBearer package from NuGet to be able to work with JWT tokens.
The package `Microsoft.AspNetCore.Authentication.JwtBearer` fulfills our requirements. You can install this either by using the GUI NuGet package manager in Visual Studio (right click your project in the solution explorer, and click on manage NuGet packages) or by using the NuGet Package Manager Console and entering the following command:

```ps
Install-Package Microsoft.AspNetCore.Authentication.JwtBearer
```

## Setting secrets

Though secrets shouldn't be set in an easy-to-access location, for the purpose simplicity, we'll be using appsettings.json as an example.

We'll create a section in our appsettings.json file which will store our secrets: namely, the issuer, audience, and a secret key. These values will be used later on to generate our JWT token.

```json
  "Jwt": {
    "Issuer": "https://example.com/",
    "Audience": "https://example.com/",
    "Key": "A secret key - please don't use this in the production environment"
  }
```

## Specifying authentication settings

In our program.cs file, we'll use the AddAuthentication method to configure our JWT authentication at runtime. We'll specify the authentication scheme as JwtBearer.

```cs
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
```

Then, we'll use the AddJwtBearer method to configure the token parameters.

```cs
builder.Services.AddAuthentication(options =>
{
    // ...
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true
    };
});
```

We set the ValidIssuer, ValidAudience, and IssuerSigningKey properties with the values specified in our appsettings.json. Furthermore, we let our API know that it should only validate the Issuer, Audience, and Signing Key; it shouldn't validate the time-based validity of the key.

Now, we need to tell the builder to add the authorization service at runtime:

```cs
builder.Services.AddAuthorization();
```

as well as the authentication and authorization middle ware:

```cs
app.UseAuthentication();
app.UseAuthorization();
```

## User Model

Now that we've set up our project, we need a model for our user credentials. We'll have a User class with 2 properties: a username, and password. Feel free to modify this class with more properties.

```cs
public class User
{
    public string UserName { get; set; }
    public string Password { get; set; }
}
```

## Generating the tokens

To let users generate the tokens, we'll need an endpoint. This endpoint will take in the credentials from the user and return a token if the credentials are valid.

Create a new controller. I've named it JwtController. We'll add a HTTP Post endpoint to this.

```csharp
[HttpPost]
public IResult Post([FromBody] User jwtUser)
{
    // ...
}
```

We take in a object from the body of the request, and map it to the model of User - which we're calling jwtUser.

Our endpoint checks if the username and password match (though, it's best practice to store credentials in a database; or you could use ASP.NET Core's Identity Manager). The issuer, audience, and key are set to those we specified in the appsettings.json file. A new TokenDescriptor is created which will add our claims to the token. The claim `Id` is a GUID, the subject and email are set to the provided username, and a `Jti` claim is also set to a GUID. The `Jti` claim is an id for the JWT which can be used to enhance the security of our token. The expiration of the token is then set to 5 minutes, and the signing algorithm is set to HmacSha512. We then use the JwtSecurityTokenHandler to create the token, and return it along with a HTTP Code of 200.

If the username and password isn't valid, a HTTP Code of 401 for unauthorized is sent.

```csharp
    if (user.UserName == "admin" && user.Password == "password")
    {
        var issuer = builder.Configuration["Jwt:Issuer"];
        var audience = builder.Configuration["Jwt:Audience"];
        var key = Encoding.ASCII.GetBytes
        (builder.Configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Email, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti,
                Guid.NewGuid().ToString())
             }),
            Expires = DateTime.UtcNow.AddMinutes(5),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = new SigningCredentials
            (new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha512Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        return Results.Ok(jwtToken);
    }
    return Results.Unauthorized();
```

## Making endpoints require authentication

To make controllers require a token for authorization, we need to add a decorator of `[Authorize(AuthenticationSchemes = "Bearer")]` to the desired controller. If the token is considered valid, the request will pass through, else a 401 response would be returned.

---

In this article, we covered the key steps involved in implementing JWT authentication in an ASP.NET Core API. We installed the required NuGet package, configured secrets and authentication settings. To allow users to generate tokens, we create an endpoint and added essential claims to the token. We applied the `[Authorize]` attribute to a controller to make it accessible only to users with valid tokens.
We've just implemented a part of token-based authentication — security is an ongoing concern, and you should think about implementing additional measures like refresh tokens, and token revocation.

Stay up to date with security best practices to ensure the long-term resilience of your application. Happy coding!