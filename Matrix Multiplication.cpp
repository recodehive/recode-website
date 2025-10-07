#include <bits/stdc++.h>
using namespace std;

#define a 2
#define b 3
#define c 2

void matrix_mul(vector<vector<int>> &arr1, vector<vector<int>> &arr2, vector<vector<int>> &arr3)
// row1*col1
// col1*col2
// i = row1
// j = col2
// k = col1
{
	for (int i = 0; i < a; i++)
	{
		for (int j = 0; j < c; j++)
		{
			arr3[i][j] = 0;
			for (int k = 0; k < b; k++)
			{
				arr3[i][j] += (arr1[i][k] * arr2[k][j]);
			}
		}
	}
}

int main()
{
	vector<vector<int>> arr1 = {{1, 2, 3}, {4, 5, 6}};
	vector<vector<int>> arr2 = {{10, 11}, {20, 21}, {30, 31}};
	vector<vector<int>> arr3(a, vector<int>(c));
	matrix_mul(arr1, arr2, arr3);

	for (int i = 0; i < a; i++)
	{
		for (int j = 0; j < c; j++)
			cout << arr3[i][j] << " ";
		cout << endl;
	}
}
