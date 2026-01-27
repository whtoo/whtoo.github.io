#include <map>
#include <vector>
#include <iostream>
#include <unordered_map>

using namespace std;

vector<vector<int>> foursum(vector<int>& nums,int target){
    vector<vector<int>> ans;
    if(nums.size() < 4) return ans;

    sort(nums.begin(),nums.end());
    unordered_map<int,vector<pair<int,int>>> mp;
    for(int i = 0; i < nums.size();++i){
        for(int j = i+1; j < nums.size();++j){
            mp[nums[i] + nums[j]].push_back(pair<int,int>(i,j));
        }
    }
    for(int i = 0;i < nums.size(); ++i){
        for(int j = i+1; j < nums.size();++j){
            int gap = target - nums[i] - nums[j];
            if(mp.find(gap) == mp.end()){
                continue;
            }

            auto vec = mp[gap];
            for(int k = 0;k < vec.size();++k){
                if(i <= vec[k].second)
                    continue;
                ans.push_back({nums[ vec[k].first ], nums[ vec[k].second ], nums[i], nums[j]});
            }
        }
    }
    sort(ans.begin(),ans.end());
    ans.erase(unique(ans.begin(),ans.end()), ans.end());
    return ans;
}

int main(){
    vector<int> nums = {1,0,-1,0,-2,2};
    auto result = foursum(nums,0);
    for(auto &ans : result){
        cout << "ans is ";
        for(auto &i : ans){
            cout << i << ",";
        }
        cout << endl;
    }
    return 0;
}