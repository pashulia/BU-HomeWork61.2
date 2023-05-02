<template>
    <div>
        <strong>
            <a class="link" @click="connectionWallet">Подключить Metamask</a>
        </strong>
        <p>Адресс юзера: {{ $store.state.wallet.address }}</p>
        <p>Название сети: {{ $store.state.wallet.chain }}</p>
        <p>ID сети: {{ $store.state.wallet.chainId }}</p>
    </div>
    <div class="tx_send">
        <p>
            <input class="address" v-model="to" placeholder="адрес получателя" />
            <input v-model="value" placeholder="сумма" />
            <button @click="sendTx">Отправить</button>
        </p>
    </div>
    <div class="deploy">
        <button @click="deployContract">Деплоить контракт</button>
    </div>
    <div class="tx_send">
        <p>
            <input v-model="_number" placeholder="число" />
            <input class="address" v-model="cAddress" placeholder="адрес" />
            <button @click="sNumber">Ввод</button>
        </p>
    </div>
    <div>
        Число = {{ ans }}
        <p>
            <input class="address" v-model="cAddress" placeholder="адрес" />
            <button @click="gNumber">Получить</button>
        </p>
    </div>
    <div class="tx_send">
        <p>
            <input v-model="_str" placeholder="строка" />
            <input class="address" v-model="cAddress" placeholder="адрес" />
            <button @click="sStr">Ввод</button>
        </p>
    </div>
    <div>
        Строка = {{ ansS }}
        <p>
            <input class="address" v-model="cAddress" placeholder="адрес" />
            <button @click="gStr">Получить</button>
        </p>
    </div>
    <div class="tx_send">
        <p>
            <input v-model="_data" placeholder="число" />
            <input class="address" v-model="cAddress" placeholder="адрес" />
            <button @click="sData">Ввод</button>
        </p>
    </div>
    <div>
        Массив = {{ ansD }}
        <p>
            <input class="address" v-model="cAddress" placeholder="адрес" />
            <button @click="gData">Получить</button>
        </p>
    </div>
    <block v-for="block in $store.state.blocks" :block="block"/>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            to: "",
            value: "",
            _number: "",
            _str: "",
            _data: "",
            ans: "",
            ansS: "",
            ansD: "",
            cAddress: "",
        }
    },
    methods: {
        ...mapActions({
            newBlockHeaders: "newBlockHeaders",
            connectionWallet: "connectionWallet",
            sendTransaction: "sendTransaction",
            deployContract: "deployContract",
            setNumber: "setNumber",
            getNumber: "getNumber",
        }),
        async sendTx() {
            await this.sendTransaction([this.to, this.value])
            this.to = ""
            this.value = ""
        },
        async sNumber(){
            await this.setNumber([this.cAddress, this._number])
        },
        async gNumber() {
            this.ans = await this.getNumber(this.cAddress)
        },
        async sStr(){
            await this.setStr([this.cAddress, this._str])
        },
        async gStr() {
            this.ansS = await this.getStr(this.cAddress)
        },
        async sData(){
            await this.setData([this.cAddress, this._data])
        },
        async gData() {
            this.ansS = await this.getData(this.cAddress)
        }
    },
    mounted() {
        // this.newBlockHeaders();
    }
}
</script>

<style scoped>
    .link {
        color: #eb9e3a;
        cursor: pointer;
        padding: 5px;
    }
    strong :hover {
        background-color: #c10a0a;
        color: #f7f5f4;
        border-radius: 5px;
    }
    .tx_send {
        padding: 10px;
        background-color: #dad9d9;
    }
    input {
        margin-right: 5px;
    }
    button {
        background-color: #b4f6c1
    }
    .deploy {
        padding: 10px;
        background-color: #dad9d9;
        margin: 10px 0;
        
    }
    .address {
        width: 650px;
    }

</style>
