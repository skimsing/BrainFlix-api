const fs = require('fs');
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');


router.route('/')
    .get((req, res)=>{
        const data = fs.readFileSync('./data/video-details.json','utf-8');
        res.send(JSON.parse(data));
    })
    .post((req, res)=>{

        const data = fs.readFileSync('./data/video-details.json','utf-8');
        const videoData = JSON.parse(data);
        if (req.body.title && req.body.description){

            let newVideo = {
                id: uuidv4(),
                title: req.body.title,
                channel: "Awesome Channel",
                image: `http://localhost:8080/images/Upload-video-preview.jpg`,
                description: req.body.description,
                views: 0,
                likes: 0,
                duration:"10:00",
                video:"https://project-2-api.herokuapp.com/stream", 
                timestamp: new Date(),
                comments: [],
            }
            videoData.push(newVideo);
            fs.writeFileSync('./data/video-details.json',JSON.stringify(videoData));
            // fs.writeFileSync(newVideo);
            res.send("new video content uploaded");
        }
        else {
                res.send("You forgot to include json data in your request");
        }
    })


router.route('/:id')
    .get((req, res) =>{
        const data = fs.readFileSync('./data/video-details.json','utf-8');
        const videoData = JSON.parse(data);
        const video = videoData.find(video =>{
            return video.id === req.params.id
        } );
        
        res.send( video ? video : "something went wrong");
    })
module.exports = router;