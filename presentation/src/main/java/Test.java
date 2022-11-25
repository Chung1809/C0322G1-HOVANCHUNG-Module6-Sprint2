import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Test {
    public static void main(String[] args) {
//     int arr[] = {1,2,3,0,5,4,3,2,1};
//     boolean flag =true;
//     int x;
//        for (int i = 0; i <= arr.length/2 ; i++) {
//            x = arr.length - 1 - i;
//            if(arr[i] != arr[x]){
//                flag = false;
//                break;
//            }
//        }
//        if(flag){
//            System.out.println("Mảng đối xứng");
//        }else {
//            System.out.println("Mảng không đối xứng");
//        }
        int n = 50;
        List<Integer> arr = new ArrayList<>();
        for (int i = 0; i <= n ; i++) {
            if(i % 5 == 0){
                arr.add(i);
            }
        }
        System.out.println("Số chia hết cho  5 : " + arr);
    }
}
