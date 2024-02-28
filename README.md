# Requirements

1. Docker
2. Postman

# Setup

1. Clone repository
```shell
git clone https://github.com/syaifulhuseinnn/birthday-message-api.git
```
2. Enable Docker

# How to run

1. Enter to project directory
```shell
cd birthday-message-api
```
2. Make sure Docker is active and run application stack
```shell
docker compose up -d
```
3. Open Postman and create new requests
   - Get all users (GET)
		
		URL
		```
		http://localhost:3000/users
		```
	
	- Get single user (GET)
		
		URL
		```
		http://localhost:3000/users/{user_id:number}
		```

   - Create a new user (POST)
		
		URL
		```
		http://localhost:3000/users
		```
		
		Request body
		```json
		{
			"firstName": "Lala",
			"lastName": "Po",
			"email": "lala@mail.com",
			"location": "Asia/Singapore",
			"birthdayDate": "1996-03-29"
		}
		```

   - Update a user (PUT)
		
		URL
		```
		http://localhost:3000/users/{user_id:number}
		```
		
		Request body
		```json
		{
			"birthdayDate": "1997-11-20"
		}
		```

   - DELETE (DELETE)
		
		```
		http://localhost:3000/users/{user_id:number}
		```
# Access Database using Adminer
1. Open URL `http://localhost:8080` on browser
2. Fill in login page:
   - System: PostgreSQL
   - Server: db
   - Username: postgres
   - Password: qwerty@123
   - Database: postgres