# Deployment Guide - PTE IELTS Platform

## Overview
This platform consists of three main applications:
- **Landing Page** (Port 3001) - Next.js marketing/landing page
- **Web App** (Port 3002) - Next.js main application
- **API** (Port 3003) - NestJS backend API

## Infrastructure
- **Container Registry**: Amazon ECR
- **Compute**: Amazon EC2
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **CI/CD**: GitHub Actions

## Required GitHub Secrets
Set these secrets in your GitHub repository settings:

### AWS Credentials
- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key

### EC2 Access
- `EC2_HOST`: Your EC2 instance public IP (e.g., 100.54.96.142)
- `EC2_USER`: SSH username (e.g., ubuntu)
- `SSH_PRIVATE_KEY`: Private SSH key for EC2 access

### Application Secrets
- `JWT_SECRET`: Secret key for JWT token generation

## Deployment Process

### Automatic Deployment (CI/CD)
1. Push to `main` branch triggers the workflow
2. GitHub Actions will:
   - Build Docker images for all three apps
   - Push images to Amazon ECR
   - Deploy to EC2 instance
   - Run health checks

### Manual Deployment
1. Build images locally:
   ```bash
   docker build -t 908861959909.dkr.ecr.us-east-1.amazonaws.com/helpmyielts-landing:latest ./apps/landing
   docker build -t 908861959909.dkr.ecr.us-east-1.amazonaws.com/helpmyielts-app:latest ./apps/web
   docker build -t 908861959909.dkr.ecr.us-east-1.amazonaws.com/helpmyielts-api:latest ./apps/api
   ```

2. Push to ECR:
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 908861959909.dkr.ecr.us-east-1.amazonaws.com
   docker push 908861959909.dkr.ecr.us-east-1.amazonaws.com/helpmyielts-landing:latest
   docker push 908861959909.dkr.ecr.us-east-1.amazonaws.com/helpmyielts-app:latest
   docker push 908861959909.dkr.ecr.us-east-1.amazonaws.com/helpmyielts-api:latest
   ```

3. Deploy on EC2:
   ```bash
   # Copy docker-compose file to EC2
   scp docker-compose.prod.yml ubuntu@100.54.96.142:/home/ubuntu/
   
   # SSH into EC2 and deploy
   ssh ubuntu@100.54.96.142
   cd /home/ubuntu
   docker-compose -f docker-compose.prod.yml up -d
   ```

## Application URLs
- **Landing**: http://100.54.96.142:3001
- **Web App**: http://100.54.96.142:3002
- **API**: http://100.54.96.142:3003
- **API Health**: http://100.54.96.142:3003/health

## Environment Variables

### API Environment
- `NODE_ENV`: production
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `JWT_SECRET`: JWT signing secret
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: us-east-1

### Web App Environment
- `NODE_ENV`: production
- `NEXT_PUBLIC_API_URL`: API endpoint URL

## Database Setup
The PostgreSQL database is automatically created with:
- Database name: `helpmyielts`
- User: `postgres`
- Password: `password` (change in production)

## Monitoring
- Check container status: `docker ps`
- View logs: `docker logs <container_name>`
- Health checks are performed automatically after deployment

## Security Notes
⚠️ **Important**: Never commit AWS credentials to version control. Always use GitHub Secrets.
- Change default passwords in production
- Use SSL certificates for HTTPS
- Implement proper firewall rules
- Regularly rotate secrets and keys

## Troubleshooting

### Common Issues
1. **Container fails to start**: Check environment variables and database connectivity
2. **Health check fails**: Verify all containers are running and ports are accessible
3. **Permission denied**: Ensure SSH keys are properly configured
4. **ECR push fails**: Verify AWS credentials and region settings

### Useful Commands
```bash
# View running containers
docker ps

# Stop all services
docker-compose -f docker-compose.prod.yml down

# View logs
docker-compose -f docker-compose.prod.yml logs -f api

# Clean up unused images
docker image prune -f
```
