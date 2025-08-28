import json
import boto3
import hashlib

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("URLShortenerTable")  # Make sure to create this table in DynamoDB

def lambda_handler(event, context):
    try:
        body = json.loads(event["body"])
        long_url = body["longUrl"]

        # Generate a short key using hashing
        short_key = hashlib.md5(long_url.encode()).hexdigest()[:6]
        short_url = f"https://your-short-url.com/{short_key}"  # Replace with your domain

        # Store in DynamoDB
        table.put_item(Item={"shortKey": short_key, "longUrl": long_url})

        return {
            "statusCode": 200,
            "body": json.dumps({"shortUrl": short_url})
        }
    except Exception as e:
        return {
            "statusCode": 500,
         
   "body": json.dumps({"error": str(e)})
        }