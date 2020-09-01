#include <vector>
#include <map>
#include <iostream>

using namespace std;

vector<int> twoSum(vector<int>& numbers,int targets){
    map<int,int> mapping;
    vector<int> result;
    // Map<Value, Index>
    for(int i = 0;i < numbers.size();i++){
        mapping[numbers[i]] = i;
    }

    for(int i = 0; i < numbers.size();i++){
        int searched = targets - numbers[i];
        if(mapping.find(searched) != mapping.end() && i != mapping[searched]){
            result.push_back(i+1);
            result.push_back(mapping[searched] + 1);
            break;
        }
    }
    return result;
}


int main(){
    vector<int> numbers = {2,7,11,15};
    int target = 9;
    auto result = twoSum(numbers,target);
    vector<int>::iterator v = result.begin();
    while(v != result.end()){
        cout << "index is " << *v << endl;
        v++;
    }
    return 0;
}