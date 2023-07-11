import { Button, Stack } from "react-bootstrap";

import Container from "react-bootstrap/Container";

import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./contexts/BudgetContext";

import BudgetCard from "./components/BudgetCard";
import AddBudgetsModel from "./components/AddBudgetsModel";
import AddExpenseModal from "./components/AddExpenseModal";

import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  const containerStyle = {
    backgroundColor: "#212528",
  };

  return (
    <div
      class="main"
      style={{ backgroundColor: "#212528", width: "100vw", height: "100vh" }}
    >
      <Container className="py-4" style={containerStyle}>
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto" style={{ color: "white" }}>
            Penny Pincher
          </h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            alignItems: "flax-start",
          }}
        >
          {budgets.map((budget) => {
            //get all expenses of the budget category and reduce it to single value
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
        </div>
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpenseClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
        <TotalBudgetCard />
      </Container>
      <AddBudgetsModel
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        defaultBudgetId={addExpenseModalBudgetId}
        show={showAddExpenseModal}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId(false)}
      />
    </div>
  );
}

export default App;
