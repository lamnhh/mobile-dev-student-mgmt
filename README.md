# HCMUS - Mobile Development - Student Management

Team members:

- 1712092: Phan Bao Minh.
- 1712247: Ho Nguyen Hai Tuan.
- 1712932: Nguyen Hy Hoai Lam.

## Setup

- Setup your own MongoDB server.
- Create a file named .env containing `CONNECTION_STRING=<CONNECTION_STRING>`.
- Install required packages: `npm install`.
- Start server: `npm start`.
- The server runs on port 3000.

## API Documentation

### GET /student?count=#{STUDENT_COUNT}

Return STUDENT_COUNT students with smallest mssv.

Return all students if STUDENT_COUNT = -1

### POST /student

```
{
  "mssv": "1712932",
  "hoten": "Nguyen Hy Hoai Lam"
}
```

Insert a new student into database.

### DELETE /student/#{MSSV}

Delete a student from database, given their mssv

### PUT /student/#{MSSV}

```
{
  "mssv": "1712932_2
  "hoten": "Nguyen Hy Hoai Lam_2"
}
```

Edit information of a student, given their mssv
