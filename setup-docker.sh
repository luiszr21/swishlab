#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🏀 SwishLab Docker Setup${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is installed${NC}"

# Build and start services
echo ""
echo -e "${BLUE}Building and starting services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo ""
echo -e "${BLUE}Waiting for services to be ready...${NC}"
sleep 10

# Check if services are running
if docker-compose ps | grep -q "swishlab-backend"; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    exit 1
fi

if docker-compose ps | grep -q "postgres"; then
    echo -e "${GREEN}✅ Database is running${NC}"
else
    echo -e "${RED}❌ Database failed to start${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🚀 All services are running!${NC}"
echo ""
echo "Access points:"
echo "- Backend API: http://localhost:3000"
echo "- Frontend: http://localhost:8081"
echo "- Database: localhost:5432"
echo ""
echo "Commands:"
echo "- View logs: docker-compose logs -f"
echo "- Stop services: docker-compose down"
echo "- Rebuild: docker-compose up -d --build"
