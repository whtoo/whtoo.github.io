#include <map>
#include <vector>
#include <iostream>

using namespace std;
vector<vector<int>> threesum(vector<int>& num){
    std::sort(num.begin(),num.end());
    vector<vector<int>> result;
    int len = num.size();
    for(int i = 0;i < len;++i){
        int target = -num[i];
        int start = i+1, end = len-1;
        while(start < end){
            if(num[start] + num[end] == target){
                vector<int> solution;
                solution.push_back(num[i]);
                solution.push_back(num[start]);
                solution.push_back(num[end]);
                result.push_back(solution);
                start++;end--;
                while(start < end && num[start] == num[start-1]){
                    start++;
                }
                while(start < end && num[end] == num[end+1]){
                    end--;
                }
            } else if(num[start] + num[end] < target){
                start++;
            } else if(num[start] + num[end] > target){
                end--;
            }
        }
        if(i < len -1){
            while(num[i] == num[i+1]) i++;
        }
    }
    return result;
}

int main() {
    // a + b + c = 0
    // a + b = -c
    
    vector<int> numbers = {-1,0,1,2,-1,4};
    auto result = threesum(numbers);
    vector<vector<int>>::iterator v = result.begin();
    while(v != result.end()){
        vector<int>::iterator i = (*v).begin();
        cout << "Ans is ";
        while(i != (*v).end()){
            cout << *i << ",";
            i++;
        }
        cout << "" << endl;
        v++;
    }
    return 0;
}