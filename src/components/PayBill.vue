<template>
  <modal v-if="show" title="Adicionar Pagamento" @close="$emit('close')">
    <div class="add-payment">
      <div class="add-payment__form">
        <label class="add-payment__label" for="value">
          Quanto você quer pagar?
        </label>
        <div class="add-payment__value">
          <span class="add-payment__coin">R$</span>
          <input
            class="add-payment__input"
            id="value"
            v-model="paymentData.paid"
            type="number"
          />
        </div>
        <transition name="slideDown">
          <span class="add-payment__validation-message" v-if="error">
            {{ error }}
          </span>
        </transition>
      </div>
      <p class="add-payment__total">Saldo restante: {{ total | price }}</p>
    </div>
    <template slot="footer">
      <button @click="$emit('close')" class="button button__link">
        Cancelar
      </button>
      <button
        :disabled="disablePayButton"
        class="button button__primary"
        @click="createPayment"
      >
        Pagar
      </button>
    </template>
  </modal>
</template>

<script>
import Modal from "./Modal";

export default {
  name: "PayBill",
  components: {
    Modal
  },
  props: {
    show: Boolean,
    total: Number
  },
  data() {
    return {
      paymentData: {
        id: this.$route.params.id,
        created_at: null,
        paid: null
      },
      error: null,
      disablePayButton: false
    };
  },
  watch: {
    paymentData: {
      deep: true,
      handler(newvalue) {
        if (Number(newvalue.paid) > this.total) {
          this.error =
            "O valor excede o valor da conta, por favor, insira um valor válido";
          this.disablePayButton = true;
        } else {
          this.error = null;
          this.disablePayButton = false;
        }
      }
    }
  },
  methods: {
    createPayment() {
      if (!this.paymentData.paid) {
        this.error = "Você precisa inserir a quantidade paga!";
      } else {
        this.paymentData.created_at = Date.now();
        this.paymentData.paid = Number(this.paymentData.paid).toFixed(2);
        this.$store.dispatch("createPayment", this.paymentData).then(res => {
          this.$emit("new-payment", res);
          this.resetPaymentData();
        });
      }
    },
    resetPaymentData() {
      this.paymentData = {
        id: this.$route.params.id,
        created_at: null,
        paid: null
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.add-payment {
  .add-payment__form {
    color: $dark-blue;
    .add-payment__label {
      display: block;
      margin-bottom: 8px;
      font-size: 24px;
    }
    .add-payment__value {
      display: flex;
      align-items: flex-end;
      background: $white;
      position: relative;
      z-index: 4;
    }
    .add-payment__coin {
      font-size: 18px;
      margin-right: 8px;
    }
    .add-payment__input {
      border: none;
      border-bottom: 2px solid $gray;
      width: 80px;
      outline: none;
      font-size: 18px;
      padding: 5px;
      transition: all ease 0.3s;
      &:focus {
        border-color: $dark-blue;
      }
    }
    .add-payment__validation-message {
      display: block;
      margin-top: 8px;
      font-size: 14px;
      color: $red;
    }
  }

  .add-payment__total {
    margin-top: 32px;
    font-size: 16px;
    color: $dark-gray;
  }
}
</style>
