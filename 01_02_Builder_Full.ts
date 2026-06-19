namespace BuilderFull {
    class Computer {
        public cpu: string = "cpu - not defined";
        public ram: string = "ram - not defined";
        public storage: string = "storage - not defined";
        public gpu?: string;
        public rgb?: string;
        public mouse?: string;
        public keyboard?: string;

        displayinfo() {
            console.log(`Configuracion de la computadora:
            CPU: ${this.cpu}
            RAM: ${this.ram}
            Storage: ${this.storage}
            GPU: ${this.gpu || "Not defined"}
            RGB: ${this.rgb || "Not defined"}
            Mouse: ${this.mouse || "Not defined"}
            Keyboard: ${this.keyboard || "Not defined"}
        `);
        }
    }

    // Builder Interface
    interface ComputerBuilder {
        reset(): ComputerBuilder;
        setCPU(cpu: string): ComputerBuilder;
        setRAM(ram: string): ComputerBuilder;
        setStorage(storage: string): ComputerBuilder;
        setGPU(gpu: string): ComputerBuilder;
        setRGB(rgb: string): ComputerBuilder;
        setMouse(mouse: string): ComputerBuilder;
        setKeyboard(keyboard: string): ComputerBuilder;
        build(): Computer;
    }

    class GamingComputerBuilder implements ComputerBuilder {
        private computer: Computer;

        constructor() {
            this.computer = new Computer();
        }

        reset(): GamingComputerBuilder {
            this.computer = new Computer();
            return this;
        }

        setCPU(cpu: string): GamingComputerBuilder {
            this.computer.cpu = `${cpu} (0C Edition)`;
            return this;
        }

        setRAM(ram: string): GamingComputerBuilder {
            this.computer.ram = `${ram} DDR5 RGB`;
            return this;
        }

        setStorage(storage: string): GamingComputerBuilder {
            this.computer.storage = storage;
            return this;
        }

        setGPU(gpu: string): GamingComputerBuilder {
            this.computer.gpu = gpu;
            return this;
        }

        setRGB(rgb: string): GamingComputerBuilder {
            this.computer.rgb = rgb;
            return this;
        }

        setMouse(mouse: string): GamingComputerBuilder {
            this.computer.mouse = mouse;
            return this;
        }

        setKeyboard(keyboard: string): GamingComputerBuilder {
            this.computer.keyboard = keyboard;
            return this;
        }

        build(): Computer {

            if (!this.computer.gpu) {
                this.computer.gpu = "NVIDIA RTX 5090";
            }

            if (!this.computer.rgb) {
                this.computer.rgb = "RGB Enabled";
            }

            const result = this.computer;
            this.reset();
            return result;
        }
    }

    class OfficeComputerBuilder implements ComputerBuilder {
        private computer: Computer;

        constructor() {
            this.computer = new Computer();
        }

        reset(): OfficeComputerBuilder {
            this.computer = new Computer();
            return this;
        }

        setCPU(cpu: string): OfficeComputerBuilder {
            this.computer.cpu = cpu;
            return this;
        }

        setRAM(ram: string): OfficeComputerBuilder {
            this.computer.ram = ram;
            return this;
        }

        setStorage(storage: string): OfficeComputerBuilder {
            this.computer.storage = storage;
            return this;
        }

        setGPU(_gpu: string): OfficeComputerBuilder {
            console.log("Office build: GPU dedicada ignorada, se usa integrada")
            return this;
        }

        setRGB(_rgb: string): OfficeComputerBuilder {
            console.log("Office build: RGB ignorada")
            return this;
        }

        setMouse(mouse: string): OfficeComputerBuilder {
            this.computer.mouse = mouse;
            return this;
        }

        setKeyboard(keyboard: string): OfficeComputerBuilder {
            this.computer.keyboard = keyboard;
            return this;
        }

        build(): Computer {

            if (!this.computer.mouse) {
                this.computer.mouse = "Mouse genérico USB";
            }

            if (!this.computer.keyboard) {
                this.computer.keyboard = "Teclado genérico USB";
            }

            const result = this.computer;
            this.reset();
            return result;
        }
    }


    // Clase implementada
    class StreamingComputerBuilder implements ComputerBuilder {
        private computer: Computer;

        constructor() {
            this.computer = new Computer();
        }

        reset(): StreamingComputerBuilder {
            this.computer = new Computer();
            return this;
        }

        setCPU(cpu: string): StreamingComputerBuilder {
            this.computer.cpu = `${cpu} Streaming Edition`;
            return this;
        }

        setRAM(ram: string): StreamingComputerBuilder {
            this.computer.ram = `${ram} Optimizada para Streaming`;
            return this;
        }

        setStorage(storage: string): StreamingComputerBuilder {
            this.computer.storage = `${storage} NVMe`;
            return this;
        }

        setGPU(gpu: string): StreamingComputerBuilder {
            this.computer.gpu = gpu;
            return this;
        }

        setRGB(_rgb: string): StreamingComputerBuilder {
            console.log("RGB ignorado");
            return this;
        }

        setMouse(mouse: string): StreamingComputerBuilder {
            this.computer.mouse = mouse;
            return this;
        }

        setKeyboard(keyboard: string): StreamingComputerBuilder {
            this.computer.keyboard = keyboard;
            return this;
        }

        build(): Computer {

            if (!this.computer.gpu) {
                this.computer.gpu = "NVIDIA RTX 4070 SUPER";
            }

            if (!this.computer.mouse) {
                this.computer.mouse = "Logitech G Pro X Superlight 2";
            }

            if (!this.computer.keyboard) {
                this.computer.keyboard = "HyperX Alloy Origins";
            }

            const result = this.computer;
            this.reset();
            return result;
        }
    }

    // Director
    class ComputerStore {
        private builder: ComputerBuilder;

        constructor(builder: ComputerBuilder) {
            this.builder = builder;
        }

        changeBuilder(builder: ComputerBuilder): void {
            this.builder = builder;
        }

        buildBasicSetup(): Computer {
            return this.builder
                .reset()
                .setCPU("Intel Core i5")
                .setRAM("8GB")
                .setStorage("256GB SSD")
                .build()
        }

        buildFullSetup(): Computer {
            return this.builder
                .reset()
                .setCPU("AMD Ryzen 9")
                .setRAM("32GB")
                .setStorage("1TB SSD")
                .setGPU("NVIDIA RTX 5090")
                .setRGB("Full RGB")
                .setMouse("Logitech Superlight")
                .setKeyboard("GK61 60% mecanico")
                .build()
        }
    }

    // Cliente
    function main() {
        const gamingBuilder = new GamingComputerBuilder();
        const officeBuilder = new OfficeComputerBuilder();
        const store = new ComputerStore(gamingBuilder);
        const streamingBuilder = new StreamingComputerBuilder(); // Implementamos la nueva clase

        console.log("=== Full Setup con Gaming Builder ===");
        const fullGamer = store.buildFullSetup();
        fullGamer.displayinfo();

        store.changeBuilder(officeBuilder);

        console.log("=== Full Setup con Office Builder ===");
        const fullOffice = store.buildFullSetup();
        fullOffice.displayinfo();

        store.changeBuilder(gamingBuilder);

        console.log("=== Basic Setup con Gaming Builder ===")
        const basicGamer = store.buildBasicSetup();
        basicGamer.displayinfo();

        store.changeBuilder(officeBuilder);
        console.log("=== Basic Setup con Office Builder ===")
        const basicOffice = store.buildBasicSetup();
        basicOffice.displayinfo();

        store.changeBuilder(streamingBuilder); // Cambiamos al builder de Streaming

        // Imprimimos en consola ambas configuraciones
        console.log("=== Full Setup con Streaming Builder ===");
        const fullStreaming = store.buildFullSetup();
        fullStreaming.displayinfo();

        console.log("=== Basic Setup con Streaming Builder ===");
        const basicStreaming = store.buildBasicSetup();
        basicStreaming.displayinfo();
    }

    main();
}