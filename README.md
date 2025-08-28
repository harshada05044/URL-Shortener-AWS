URL Shortener using AWS

Introduction:

This project is a URL Shortener built using AWS. It allows users to enter a long URL and get a shortened version, which can later redirect back to the original link. The project is implemented using S3 for hosting the frontend, API Gateway for routing API requests, and two Lambda functions — one for generating the short URL and another for handling redirection.

Motivation:

I built this project to gain hands-on experience with cloud services and understand how serverless architecture works in real-world applications. Instead of using a traditional backend, I implemented the logic in a cloud-native, serverless way, which helped me learn AWS services like S3, API Gateway, and Lambda.

Tech Stack:

Frontend Hosting & Storage: AWS S3
API Routing: AWS API Gateway (HTTP API)
Backend Logic: AWS Lambda (two functions)
Shortening Logic: MD5 hashing for generating short codes
File Storage: JSON file (url-mapping.json) stored in S3

Architecture & How It Works:

Frontend: Hosted on S3. Users enter a long URL and submit it to get a shortened URL.
API Gateway: Defines two endpoints:
POST /shorten: Receives long URLs and triggers a Lambda function to generate a short URL.
GET /{short_code}: Receives short codes and triggers a Lambda function for redirection.

Lambda Functions:

Shortening Function (POST): Generates a unique short code using MD5 hashing (first 6 characters) and updates the url-mapping.json in S3. Returns the short URL.
Redirection Function (GET): Reads the short code from the request, looks up the original URL in url-mapping.json, and returns a 301 redirect response.

End-to-End Flow:

User submits a long URL → API Gateway triggers the shortening Lambda → Lambda updates JSON in S3 → Returns short URL.
User visits short URL → API Gateway triggers redirection Lambda → Lambda fetches original URL from S3 → Redirects user automatically.

Features:

Fully serverless architecture
Generates short URLs automatically
Stores URL mappings in S3 (dual role: frontend hosting + data storage)
No traditional backend or database required

Potential Improvements:

Replace JSON file in S3 with DynamoDB for faster, scalable storage.
Add support for custom short URLs instead of automatically generated ones.

How to Run Locally:

Clone the repository: git clone https://github.com/harshada05044/URL-Shortener-AWS.git
Open frontend/index.html in a browser to test the frontend.
Deploy backend on AWS Lambda and configure API Gateway routes as described above.
