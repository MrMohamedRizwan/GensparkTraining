//using SolidPrincipleApp.Bad_Design.Single_Responsibility_Principle;
//using SolidPrincipleApp.General_Designs.Liskov_Substitution_Principle;
using SolidPrincipleApp.Good_Design.DIP;
using SolidPrincipleApp.Good_Design.Interface_Segregation.Interface;
using SolidPrincipleApp.Good_Design.Interface_Segregation.Services;
using SolidPrincipleApp.Good_Design.Liskov_Substitution_Principle;
using SolidPrincipleApp.Good_Design.Open_Closed_Responsibility;
using SolidPrincipleApp.Good_Design.Single_Responsibility_Principle;
using System.Reflection.Metadata;

class Program
{
    static void Main(string[] args)
    {
        //Single responsibilty
        //var invoice = new Invoice { Id = 1, Amount = 1000.0 };
        //var calculator=new InvoiceCalculator();
        //var tax=calculator.CalculateTax(invoice);
        //Console.WriteLine($"The Tax amount is {tax}");

        //var printer = new InvoicePrinter();
        //printer.Print(invoice);

        //var emailer = new InvoiceEmail();
        //emailer.email(invoice);

        // Open Closed Responsibility
        //var p1 = new PaymentService(new UPIPayment());
        //p1.MakePayment(100);

        //var p2 = new PaymentService(new ApplePayPayment());
        //p2.MakePayment(200);

        ////Liskov Substitution Principle
        //Documents d = new ReadOnlyDocument();
        //d.View();
        //d.Edit(); //error


        //Documents dd = new EditableDocument();
        //dd.View();
        //if (dd is EditableDocument editable)
        //{
        //    editable.Edit();
        //}

        ////Interface Segregation
        //IPrinter oldPrinter = new OldPrinter();
        //oldPrinter.Print();

        //// Use NewMultiFunctionPrinter (supports all operations)
        //NewPrinter newPrinter = new NewPrinter();
        //newPrinter.Print();
        //newPrinter.Scan();
        //newPrinter.Fax();

        ////Dependency Inversion
        IMessageService messageService = new EmailService();
        Notification notification = new Notification(messageService);
        notification.NotifyUser("Your appointment is confirmed.");

    }
}
