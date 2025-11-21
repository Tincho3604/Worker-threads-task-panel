# **README – Worker Pool with Concurrency, EventEmitter Architecture & Real-Time Monitoring**

This project implements a **controlled concurrency system** using **Node.js Worker Threads**, an **event-driven architecture (EventEmitter / Observer)**, and real-time monitoring through **Socket.IO**.
A **React** frontend displays the live status of each worker.
<img width="1588" height="310" alt="image" src="https://github.com/user-attachments/assets/25c5f602-295d-4fcb-8ca3-3b82f6b68e85" />

---

## **Overview**

The system maintains **5 active workers** at all times, each executing a heavy computational task.
Every worker reports its **CPU usage, memory consumption, and progress** to the frontend in real time.

When a worker finishes its task:

1. Its status changes to *inactive*, and its final metrics are sent to the frontend.
2. The backend properly releases its resources.
3. A new worker is automatically created to keep the pool full.

This challenge demonstrates:

* Efficient resource management
* True concurrency using Worker Threads
* Real-time communication with Socket.IO
* Event-driven architecture (EventEmitter / Observer Pattern)
* React frontend updating live without page reload

---

## **Tech Stack**

### **Backend**

* Node.js
* Worker Threads
* EventEmitter (Observer Pattern)
* Socket.IO
* System metrics & resource management

### **Frontend**

* React
* Socket.IO Client
* Live grid displaying worker states

---

## **Features**

* Dynamic worker pool (always 5 active workers)
* Real-time metrics:

  * CPU
  * RAM
  * Counter / Progress
  * Execution time
* Automatic worker replacement when one completes
* Proper resource cleanup
* Scalable event-driven design

---

## **How to Run**

### **Backend**

```
npm install
npm run dev
```

### **Frontend**

```
npm install
npm run dev
```
