export enum Status {
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED'
}

export interface BorrowBooks {
    borrowId: string;
    bookId: number;
    borrowedBy: string;
    borrwedDate: string;
    dueDate: string;
    returnDate: string;
    status: Status;
}
