<template>
    <h3>Информация о транзакции: </h3>
    <hr/>
    <ul>
        <li>Номер блока: {{ tx.blockNumber }}</li>
        <li>Хэш блока: {{ tx.blockHash }}</li>
        <li>Отправитель: {{ tx.from }}</li>
        <li>Получатель: {{ tx.to }}</li>
        <li>Затрачено газа: {{ tx.gas }}</li>
        <li>Цена газа: {{ tx.gasPrice }}</li>
        <li>Хэш транзакции: {{ tx.hash }}</li>
        <li>Номер(nonce): {{ tx.nonce }}</li>
    </ul>
    
    
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "tx-item",
    data() {
        return {
            tx: {},
        }
    },
    props: {
        transactionHash: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions({
            getTx: "getTx"
        })
    },
    async mounted() {
        this.tx = await this.getTx(this.transactionHash);
    },
    watch: {
        async transactionHash() {
            this.tx = await this.getTx(this.transactionHash);
        }
    },
    
}
</script>

<style scoped>
    h3 {
        text-align: center;
    }
</style>
