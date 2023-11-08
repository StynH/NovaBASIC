import {IExprVisitor} from "../../Visitor/Interface/exprvisitor";

export interface IExprVisitable{
    accept(visitor: IExprVisitor): void;
}
