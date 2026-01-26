const fs = require('fs');
const { createClient } = require('bedrock-protocol');

class MinecraftBot {
    constructor() {
        this.config = this.loadConfig();
        this.client = null;
    }

    loadConfig() {
        try {
            const configData = fs.readFileSync('./config.json', 'utf8');
            return JSON.parse(configData);
        } catch (error) {
            console.error('Failed to load config,please check "config.json" at software directory:', error);
            process.exit(1);
        }
    }

    connect() {
        console.log('Attempting to connect to server...');
        console.log(`Server: ${this.config.serverAddress}:${this.config.serverPort}`);
        
        const connectTimeout = setTimeout(() => {
            console.error('Connection timeout: Server not responding after 2 minutes');
            process.exit(1);
        }, 120000);

        this.client = createClient({
            host: this.config.serverAddress,
            port: this.config.serverPort,
            username: this.config.botName,
            offline: this.config.offlineMode,
            version: this.config.gameVersion,
            debug: true,
            skipPing: true,
        });

        this.client.on('connect', () => {
            clearTimeout(connectTimeout);
            console.log('Connected to server');
        });

        this.client.on('spawn', () => {
            clearTimeout(connectTimeout);
            console.log('Bot spawned');
        });


        this.client.on('disconnect', () => {
            clearTimeout(connectTimeout);
            console.log('Disconnected from server');
        });

        this.client.on('error', (error) => {
            clearTimeout(connectTimeout);
            console.error('Error:', error);
        });

        this.client.on('login', () => {
            clearTimeout(connectTimeout);
            console.log('Login successful');
        });

        this.client.on('encryption_begin', () => {
            console.log('Encryption started');
        });

        this.client.on('resource_pack_info', () => {
            console.log('Resource pack info received');
        });

        this.client.on('connect_allowed', () => {
            clearTimeout(connectTimeout);
            console.log('Connection allowed');
        });

        this.client.on('server_info', () => {
            clearTimeout(connectTimeout);
            console.log('Server info received');
        });
    }

    
    /*
    handlePlayerList(packet) {
        console.log('Received player list packet:', packet.params.entries);
        const entries = packet.params.entries;
        for (const entry of entries) {
            if (entry.name === this.config.targetPlayer) {
                this.targetPlayer = entry;
                console.log(`Found target player: ${this.config.targetPlayer}`);
                break;
            }
        }
    }

    handleMovePlayer(packet) {
        console.log('Received move player packet:', packet.params);
        console.log('Bot entityId:', this.client.entityId);
        if (this.targetPlayer && packet.params.runtime_entity_id) {
            contime_entity_id: this.client.entityId,
                position: packet.params.position,
                rotation: packet.params.rotation,
                mode: 0,
                on_ground: true
            });
        }
    }*/

    start() {
        console.log(`Starting bot with name: ${this.config.botName}`);
        console.log(`Connecting to: ${this.config.serverAddress}:${this.config.serverPort}`);
        if (this.config.followPlayer) {
            console.log(`Will follow player: ${this.config.targetPlayer}`);
        }
        this.connect();
    }
}

const bot = new MinecraftBot();
bot.start();