import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
//        Short s1 =200;
//        Integer s2 = 400;
//        Long s3 = (long) s1+s2;
//        String s4 = (String) (s3*s2);
//        System.out.println("Sum is" + s4);
        Scanner scanner  = new Scanner(System.in);
        demo(scanner.nextInt());
    }
    public static void demo(int var){
        if(var++ < 10){
            System.out.println("Hello");
        }else {
            System.out.println("Fail");
        }
    }
}
