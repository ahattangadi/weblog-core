---
title: 'Understanding JWT-Based Authentication'
date: 2023-05-30
tags: authentication
---

Today, we'll delve into the intricacies of JWT based authentication, a powerful method to secure your applications.

## The JWT "Passport"

Think of JWT Tokens like digital passports, similar to those you use while travelling. It consists of 3 essential components: the header, the payload, and the signature.

The header is like the cover of our passport, providing necessary information. It contains metadata about the token, such as the hashing algorithm used and the type of token it represents.

Next, we have the payload, which is the core of our JWT passport. This section carries the actual data, much like the personal information page of your passport. This includes details about the user, such as their name, email, role, or any other relevant information, which are known as _claims_.

Last but not least, we have the signature, the security seal of our JWT passport. This signature is generated using a secret key known only to the server. It ensures the integrity of the token, just like the anti-counterfeiting measures in your passport that prevent any tampering or forgery.

## Authenticating with your token

Now, let's see how JWT tokens work in practice. When a user logs in to a web application, the server generates a JWT token and sends it to the application.

Once you have your JWT token, you present it with every subsequent request to prove your identity. The server can then verify the authenticity and integrity of the token by validating the signature using the secret key and verifying that the necessary claim requirements are met (think: user role). If everything checks out, you're granted access to the requested resources.

## Stateless tokens

One of the benefits of JWT authentication is statelessness. Unlike traditional session-based authentication, where the server needs to keep track of session data, JWT tokens are self-contained. They carry all the necessary information within themselves, making the authentication process lightweight and scalable.

The server can focus on processing requests efficiently. This also allows for easy horizontal scaling, as any server in a cluster can handle a request without relying on shared session data.

## Practical Example

To experience JWT authentication in action, you can check out the JWT generator at [jwt.io](https://jwt.io). This tool allows you to create JWT tokens by specifying the header, payload, and secret key. It also provides a simple way to decode and verify tokens, giving you a hands-on understanding of how JWT works.

A token looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGRyaWZ0bmV0d29ya3MubmV0IiwiaWF0IjoxNTE2MjM5MDIyfQ.eSxXOKmuJVnan8fM2fvj65Dq5SjtI-kx_qXDzdshDc4
```

In this token, the `.` is used as a separator between the different parts. Let's break down the token into its components and explore their significance:

Header:
The first part of the token is the header. When decoded, it results in the following JSON output:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The header provides essential metadata about the token. In this example, the `alg` (algorithm) indicates that the HS256 algorithm was used to hash the token, and the `typ` (type) indicates that this is a JWT token.

Payload:
The second part of the token is the payload. When decoded, it results in the following JSON output:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "email": "john@driftnetworks.net",
  "iat": 1516239022
}
```

The payload contains the actual data about the user who is requesting the resource. In this example, the payload includes the following information:

- `sub` (subject): It refers to the subject whom the token represents, identified by the value 1234567890.
- `name`: It specifies the name of the requesting user as "John Doe".
- `email`: It provides the email address of the user as "john@driftnetworks.net".
- `iat` (issued at): It indicates the time at which the token was issued, represented as the number of seconds since the UNIX epoch (January 1, 1970, 00:00:00 UTC). In this case, the value is 1516239022.

The payload can contain additional claims based on the specific requirements of your application, such as user roles, permissions, or any custom data you need to associate with the token.

While this is an example of a generic JWT token, they may also include other parameters, like expiry times (`exp`), audience (`aud`), issuer (`iss`), and many others, which provide further control.