#!/bin/bash

# Test script for Contact Manager App Production Setup
# Run from root directory: bash test-production.sh

echo "=========================================="
echo "Contact Manager App - Production Test"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SERVER_URL="http://localhost:5000"
API_URL="$SERVER_URL/api/contacts"

# Test 1: Health Check
echo -e "${BLUE}[TEST 1] Health Check${NC}"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$SERVER_URL/api")
if [ "$RESPONSE" = "200" ]; then
  echo -e "${GREEN}✓ Health check passed${NC}"
else
  echo -e "${RED}✗ Health check failed (HTTP $RESPONSE)${NC}"
fi
echo ""

# Test 2: Get All Contacts
echo -e "${BLUE}[TEST 2] Get All Contacts${NC}"
CONTACTS=$(curl -s "$API_URL")
if echo "$CONTACTS" | grep -q "_id"; then
  echo -e "${GREEN}✓ Retrieved contacts successfully${NC}"
  echo "Sample: $(echo $CONTACTS | head -c 100)..."
else
  echo -e "${RED}✗ Failed to retrieve contacts${NC}"
fi
echo ""

# Test 3: Create Contact
echo -e "${BLUE}[TEST 3] Create New Contact${NC}"
NEW_CONTACT=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Contact","phoneNumber":"5551234567","email":"test@production.com"}')

if echo "$NEW_CONTACT" | grep -q "_id"; then
  CONTACT_ID=$(echo "$NEW_CONTACT" | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
  echo -e "${GREEN}✓ Contact created successfully${NC}"
  echo "Contact ID: $CONTACT_ID"
else
  echo -e "${RED}✗ Failed to create contact${NC}"
fi
echo ""

# Test 4: Get Specific Contact
if [ ! -z "$CONTACT_ID" ]; then
  echo -e "${BLUE}[TEST 4] Get Specific Contact${NC}"
  GET_CONTACT=$(curl -s "$API_URL/$CONTACT_ID")
  if echo "$GET_CONTACT" | grep -q "Test Contact"; then
    echo -e "${GREEN}✓ Retrieved specific contact successfully${NC}"
  else
    echo -e "${RED}✗ Failed to retrieve specific contact${NC}"
  fi
  echo ""
fi

# Test 5: Frontend App
echo -e "${BLUE}[TEST 5] Frontend App (React)${NC}"
FRONTEND=$(curl -s "$SERVER_URL")
if echo "$FRONTEND" | grep -q "index.html\|react"; then
  echo -e "${GREEN}✓ React app served successfully${NC}"
  echo "Response: $(echo $FRONTEND | head -c 80)..."
else
  echo -e "${RED}✗ Failed to serve frontend${NC}"
fi
echo ""

# Test 6: SPA Fallback
echo -e "${BLUE}[TEST 6] SPA Fallback Routing${NC}"
SPA_ROUTE=$(curl -s "$SERVER_URL/contacts")
if echo "$SPA_ROUTE" | grep -q "index.html\|react"; then
  echo -e "${GREEN}✓ SPA fallback routing working${NC}"
else
  echo -e "${RED}✗ SPA fallback routing failed${NC}"
fi
echo ""

# Test 7: Update Contact
if [ ! -z "$CONTACT_ID" ]; then
  echo -e "${BLUE}[TEST 7] Update Contact${NC}"
  UPDATED=$(curl -s -X PUT "$API_URL/$CONTACT_ID" \
    -H "Content-Type: application/json" \
    -d '{"name":"Updated Test Contact","phoneNumber":"5559876543","email":"updated@production.com"}')
  
  if echo "$UPDATED" | grep -q "Updated Test Contact"; then
    echo -e "${GREEN}✓ Contact updated successfully${NC}"
  else
    echo -e "${RED}✗ Failed to update contact${NC}"
  fi
  echo ""
fi

# Test 8: Delete Contact
if [ ! -z "$CONTACT_ID" ]; then
  echo -e "${BLUE}[TEST 8] Delete Contact${NC}"
  DELETED=$(curl -s -X DELETE "$API_URL/$CONTACT_ID")
  
  if echo "$DELETED" | grep -q "deleted successfully"; then
    echo -e "${GREEN}✓ Contact deleted successfully${NC}"
  else
    echo -e "${RED}✗ Failed to delete contact${NC}"
  fi
  echo ""
fi

echo "=========================================="
echo -e "${GREEN}All tests completed!${NC}"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Open http://localhost:5000 in your browser"
echo "2. Test the Contact Manager UI"
echo "3. Deploy to Azure when ready"
echo ""
