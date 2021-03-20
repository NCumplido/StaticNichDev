document.addEventListener('DOMContentLoaded', () => {

    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alertDiv = document.getElementById('alert')
    const scoreDiv = document.getElementById('score')
    
    document.getElementById("btnBattleRex").addEventListener("click", 
        function(){ document.getElementById("dino").src = "/images/battlerex4nic.png";  
        });

    let score = 0

    let position = 0        //Starting point
    let gravity = 0.9       //DYK: Value of gravity is 9.806
    
    let isJumping = false   //Prevents from double jumping
    let isGameOver = false

    function control(e) {
        //Spacebar
        if (e.keyCode === 32) {
            if(!isJumping){
                isJumping = true
                
                jump()
            }
            if(isGameOver){
                location.reload();
            }
        }
    }

    //If a "keyup" event happens then call the above control method. 
    document.addEventListener('keyup', control)

    //Move x amount of pixels until the timer has finished
    function jump() {
        score++
        scoreDiv.innerHTML = 'Score: ' + score
        let count = 0
        let timerID = setInterval(function () {

            //Down 
            if (count === 15) {

                //Stop dino from going too far up
                clearInterval(timerID)

                console.log('down')

                let downTimerID = setInterval(function () {

                    //Stop dino from going down
                    if (count === 0) {
                        clearInterval(downTimerID)
                        isJumping = false
                    }
                    
                    //The position value was 30 but it made the dino fall below the page
                    position -= 5
                    count--
                    position = position*gravity
                    dino.style.bottom = position + 'px'

                })
            }

            //Up
            console.log('up')

            //count used to be position
            position += 30
            count++
            position = position*gravity
            dino.style.bottom = position + 'px'
            console.log(dino.style.bottom = position)
        }, 20)

    }

    function generateObstacle(){

        //Get a random number between 0 and 4000
        let randomTime = Math.random() * 4000

        let obstaclePosition = 1000

        const obstacle = document.createElement('div')
        
        //Divs still generate once game is over but with no styling
        if(!isGameOver) obstacle.classList.add('obstacle')
        
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerID = setInterval(function() {

            //Collision detection
            if(obstaclePosition > 0 && obstaclePosition < 60 && position < 60){
                clearInterval(timerID)
                alertDiv.innerHTML = 'Game Over - press the space bar to restart'
                isGameOver = true

                //Remove all children
                // while (grid.firstChild){
                //     grid.removeChild(grid.lastChild) //ToDo: Look into documentation and maybe only freeze one obstacle and the dino?
                // }

            }
            else{

            }

            obstaclePosition -= 10
            obstacle.style.left = obstaclePosition + 'px'

        }, 20)
        
        if( !isGameOver) setTimeout(generateObstacle, randomTime)

    }

    generateObstacle()

})