import {IExprVisitable} from "./Interface/exprvisitable";
import {IExprVisitor} from "../Visitor/Interface/exprvisitor";

export  abstract class Expr implements IExprVisitable
{
    protected constructor(){
    }

    public abstract accept(visitor: IExprVisitor): void;
}
