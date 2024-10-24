# Stage 1: Install dependencies and build the application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY .env .env

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine AS runner

ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/src/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
