import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export function useBudgets() {
  return useContext(BudgetsContext);
}

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

//each budget will look like
// {
//   id:
//   name:
//   max:
// }

//each expense will look like
// {
//   id:
//   budgetId:
//   amount:
//   description:
// }
export const BudgetsProvider = ({ children }) => {
  //INSTEAD OF STORING IT IN HERE, USE LOCAL STORAGE
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  //to view all expenses for a category of budget
  function getBudgetExpenses(budgetId) {
    //it filters the expense who's id belongs to a particular budgetId(category)
    return expenses.filter((expense) => expense.budgetId === budgetId);
  }

  //to add a budget and expense
  function addBudget({ name, max }) {
    setBudgets((prevBudget) => {
      //if we find another budget in the same name, dont create a new budget category
      if (prevBudget?.find((budget) => budget.name === name)) {
        return prevBudget;
      }
      return [...prevBudget, { id: uuidV4(), name, max }];
    });
  }

  function addExpense({ budgetId, amount, description }) {
    setExpenses((prevExpense) => {
      return [...prevExpense, { id: uuidV4(), budgetId, description, amount }];
    });
  }

  //to delete a budget and expense

  //NOTE:when we delete a budget we move everything into an uncategorized folder

  function deleteBudget({ id }) {
    setBudgets((prevBudget) => {
      return prevBudget?.filter((budget) => budget.id !== id);
    });
  }

  function deleteExpense({ id }) {
    setExpenses((prevExpense) => {
      return prevExpense?.filter((expense) => expense.id !== id);
    });
  }

  return (
    //all the children in the context has access to everything in value
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
