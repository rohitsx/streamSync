# server/Dockerfile
FROM denoland/deno:alpine-1.39.4

WORKDIR /usr/src/app

# Copy the dependencies file
COPY deno.json .
COPY deno.lock .

# Copy application files
COPY . .

EXPOSE 8000

# The entrypoint script will handle caching and running
CMD ["deno", "task", "dev"]
