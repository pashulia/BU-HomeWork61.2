<template>
    <h3>Информация о блоке: </h3>
    <hr/>
    <ul>
        <li>Номер блока: {{ block.number }}</li>
        <li>Хэш блока: {{ block.hash }}</li>
        <li>Газа использовано: {{ block.gasUsed }}</li>
        <li>Стоимость: {{ block.baseFeePerGas }}</li>
        <p>Список транзакций:</p>
        <li class="tx" v-for="transaction in block.transactions"> 
            <a @click="$router.push(`/block/tx/${transaction}`)">{{ transaction }}</a>
        </li>
    </ul>
    
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "block-item",
    data() {
        return {
            block: {},
        }
    },
    props: {
        blockNumberOrHash: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions({
            getBlock: "getBlock"
        })
    },
    async mounted() {
        this.block = await this.getBlock(this.blockNumberOrHash);
    },
    watch: {
        async blockNumberOrHash() {
            this.block = await this.getBlock(this.blockNumberOrHash);
        }
    },
    
}
</script>

<style scoped>
    h3 {
        text-align: center;
    }
    ul {
        background-color: #dddbdb;
        border-radius: 5px;
    }
    .tx :hover {
        color: #071bf5;
        cursor: pointer;
    }
</style>
