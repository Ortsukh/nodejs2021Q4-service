# RS School REST service

## Clone repositorie
```
git clone git@github.com:Ortsukh/nodejs2021Q4-service.git
```
## Move to branch doker-task
```
git checkout nest
```
## Installing NPM modules

```
npm install
```

## Running application

```
docker-compose up --build   

```
fastify / express

http.codes.200: ................................................................ 600
http.codes.201: ................................................................ 1200
http.request_rate: ............................................................. 30/sec
http.requests: ................................................................. 1800
http.response_time:
  min: ......................................................................... 4/5
  max: ......................................................................... 473/519
  median: ...................................................................... 54.1/58.6
  p95: ......................................................................... 186.8/190.6
  p99: ......................................................................... 210.6/210.6
http.responses: ................................................................ 1800
vusers.completed: .............................................................. 600
vusers.created: ................................................................ 600
vusers.created_by_name.0: ...................................................... 600
vusers.session_length:
  min: ......................................................................... 157.5/163.7
  max: ......................................................................... 564/601.3
  median: ...................................................................... 202.4/210.6
  p95: ......................................................................... 257.3/273.2
  p99: ......................................................................... 518.1/550.1
  ```