/*high = [15,25,35]; // localStorage
translate value = 20px
count = 0  1 2 3 4 5 6
translate value = 20px + 2 * (count)

count = 0
flag = 0
while(flag <= 5){


speed = count//10
card.style.transformY = 20 + speed * 10;

if(white.isClicked() or !black.isclicked()){
    flag += 1;
}
count += 1
}

if(count > max(high)){
    high.push(count)
    remove min of high
    new screen, show(new high score) show(podium);
}



here,
searched is the number of rows removed; starts at 0
score is the number of blacks clicked; starts at 0
4 is for the initial 4 all-white rows
lives = fixed number(1/3/5)
searched - (score + 4) is the number of lives left
if(searched - score - 4 == lives){
    end(return score)
}
*/