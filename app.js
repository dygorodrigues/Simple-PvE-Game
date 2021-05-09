new Vue({
    el:'#app',
    data:{
        running:false,
        playerLife:100,
        monsterLife:100,
        special: false,
        logs: []
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame(){
            this.running = true;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = [];
        },
        giveUpGame(){
            this.running = false;
            this.playerLife = 100;
            this.monsterLife = 100;
            this.logs = []
        },
        attack(special){
            if(this.monsterLife > 0) this.hurt('playerLife',7,12,false,'Monstro','Jogador','monster' )
            if(this.playerLife > 0) this.hurt('monsterLife',5,10,special, 'Jogador','Monstro','player')
        },
        hurt(atr, min,max,special, source, target, cls){
            const plus = special ? 5 : 0;
            const hurt = this.getRandom(min+plus,max+plus)
            this[atr] = Math.max(this[atr] - hurt, 0)
            if(special) this.registerLog(`${source} usou ataque especial no ${target} com ${hurt}`,cls)
            else this.registerLog(`${source} atacou o ${target} com ${hurt}`,cls)
        },
        getRandom(min, max){
            const value = Math.random() * (max-min) + min;
            return Math.round(value);
        },
        heal(min,max){
            const heal = this.getRandom(min,max)
            this.playerLife = Math.min(this.playerLife + heal,100)
            this.registerLog(`Jogador curou ${heal}`,'healling')
        },
        healAndHurt(){
            this.heal(8,13)
            this.hurt('playerLife',7,12,false, 'Monstro', 'Jogador', 'monster')
        },
        registerLog(text, cls){
            this.logs.unshift({text,cls})
        }
    },
    watch:{
        hasResult(value){
            if(value) this.running = false;
        }
    },
})