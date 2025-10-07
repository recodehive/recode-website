#include <bits/stdc++.h>
using namespace std;

void topKElements(const vector<int>& nums, int k) {
    //priority_queue<int> maxHeap;
    // OR
    // priority_queue<int, vector<int>, less<int>> maxHeap;
     
    priority_queue<int, vector<int>, greater<int>> minHeap;

    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();  // remove the smallest
        }
    }


    while (!minHeap.empty()) {
        cout << minHeap.top() <<endl;
        minHeap.pop();
    }

}

int main() {
    vector<int> nums = {4, 1, 7, 3, 9, 2, 6};
    int k = 3;

    cout << "Top " << k << " elements are: "<<endl;
    topKElements(nums, k);



    return 0;
}
/*
Top 3 elements are: 
6
7
9
*/
