import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux'
import Burger from './../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 20,
    meat: 20,
    bacon: 20
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }, 
        totalPrice: 20,
        purchaseable: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchaseable : sum > 0
        })    
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        console.log(updatedIngredients);
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount !== 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceSubtraction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceSubtraction;
            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        console.log(disabledInfo)
        return (
            <Aux>
                <Modal>
                    <OrderSummary ingredients = {this.state.ingredients}/>
                </Modal>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls
                    addIngredientHandler = {this.addIngredientHandler}
                    removeIngredientHandler = {this.removeIngredientHandler} 
                    disabled = {disabledInfo}
                    purchaseable = {this.state.purchaseable}
                    price = {this.state.totalPrice}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;