import {Expr} from "../../AST/Expressions/expr";
import {BinaryExpr} from "../../AST/Expressions/binaryexpr";
import {Tokens} from "../../AST/Tokens/tokens";

enum Precedence {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
}

export function getPrecedence(condition: string): Precedence {
    switch (condition) {
        case Tokens.EQUALS:
        case Tokens.NOT_EQUALS:
        case Tokens.GT:
        case Tokens.GTE:
        case Tokens.LT:
        case Tokens.LTE:
        case Tokens.AND:
        case Tokens.OR:
            return Precedence.LOW;
        case Tokens.PLUS:
        case Tokens.MINUS:
            return Precedence.MEDIUM;
        case Tokens.MULTIPLY:
        case Tokens.DIVIDE:
        case Tokens.MODULO:
            return Precedence.HIGH;
        default:
            return 0;
    }
}

export function balanceExpr(expr: Expr): Expr {
    if (expr instanceof BinaryExpr) {
        expr.leftExpr = balanceExpr(expr.leftExpr);
        expr.rightExpr = balanceExpr(expr.rightExpr);

        if (expr.rightExpr instanceof BinaryExpr) {
            const rightPrecedence = getPrecedence(expr.rightExpr.condition);
            const currentPrecedence = getPrecedence(expr.condition);

            if (rightPrecedence < currentPrecedence) {
                const newRight = expr.rightExpr;
                expr.rightExpr = newRight.leftExpr;
                newRight.leftExpr = expr;
                return newRight;
            }
        }
    }
    return expr;
}
