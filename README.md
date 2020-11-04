# react-hooks-lab1
Repository for Lab 1 of CapTech's React learning series focused on React Hooks.

## Prerequisites
- Node installed on your machine (v12 or higher)
- Git installed on your machine 

## Setup instructions
1. Clone this repository to your local machine.
2. On your machine, cd into the "start" directory of this project.
3. Once inside the directory, run `npm install`.
4. `rpm run start` will launch the application.

## Introduction
In this lab, we will be building a virtual smart home dashboard using React Hooks. Our dashboard will have the following functionality:
- Display a list of our smart devices
- Add a device
- Delete a device
- Toggle device on/off 

The basic components and styling of the application have already been implemented for you, as we want to jump right into using hooks. 

We will start the lab by implementing local state across the application using the `useState` hook. Then, we will begin loading our home from an API call with `useEffect` when our app initializes. We will also convert the various functions across the application to hit our API, adding loading states along the way. Finally, we will abstract some of the reused logic from each of our API calls into our own custom hook. 

## Part 1: Add local state using `useState`
Once you have the application up and running, you'll notice that none of the functionality is actually working. 
