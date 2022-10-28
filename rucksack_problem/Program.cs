using System;

namespace ProjectNTraining
{
    class Program
    {
        static int n_volume_max = 16;

        static int [] a_n_volume = {6,3,5,4,5,2};
        static int [] a_n_item = {2,3,7,4,4,2};

        static int[,] matrixTable;

        static int[,] InitMatrixTable()
        {
            int[,] m = new int[n_volume_max+1, a_n_volume.Length];
            for(int i = 0; i<m.GetLength(0); i++)
            {
                for (int j = 0; j<m.GetLength(1); j++) {
                    m[i,j] = -1;
                }
            }
            return m;
        }

        static void findItem(int maxVal)
        {
            int curVol = 0;
            for(int i = 0; i < matrixTable.GetLength(0); i++)
            {
                if (matrixTable[i,0] == maxVal)
                {
                    curVol = i;
                }
            }

            Console.WriteLine("Items with following indexes have been packed:");
            for(int i = 0; i < a_n_volume.Length; i++)
            {
                if(curVol - a_n_volume[i] >= 0 && matrixTable[curVol - a_n_volume[i],i+1] == matrixTable[curVol, i]-a_n_item[i])
                {
                    
                    Console.Write(i + " -> ");
                    curVol = curVol - a_n_volume[i];
                }
            }
        }
        
        static void PrintMatrix()
        {
            Console.WriteLine("+++++ MATRIX TABLE +++++");
            for(int i = 0; i < matrixTable.GetLength(0); i++)
            {
                for (int j = 0; j < matrixTable.GetLength(1); j++)
                {
                    Console.Write(matrixTable[i,j]+ "  |  ");
                }
                Console.WriteLine();
            }
        }

        static void Main(string[] args)
        {
            matrixTable = InitMatrixTable();

            int n_x = 10;
            int n_y = 10;
            int[,] a_a_n = new int[n_x, n_y];
            a_a_n[0,1] = 2;
            // Console.WriteLine(a_a_n.ToString());
            // Console.WriteLine(a_a_n.Length);

            foreach(var item in a_a_n)
            {
                Console.WriteLine(item.ToString());
            }


            // Console.WriteLine("The backpack riddle:");
            // Console.WriteLine();

            // int res = Pack(n_volume_max, 0);
            // PrintMatrix();

            // findItem(res);
            // Console.WriteLine();
            // Console.WriteLine("The max value to be packed is:");
            // Console.WriteLine(res);
        }

        static int Pack(int restVol, int i)
        {
            if(i < a_n_volume.Length)
            {
                if(matrixTable[restVol,i] != -1)
                {
                    return matrixTable[restVol,i];
                }
                    
                //negative case
                int unpacked = Pack(restVol, i + 1);

                //positive case
                int packed = 0;
                if (restVol - a_n_volume[i] >= 0) {
                    packed = a_n_item[i] + Pack(restVol - a_n_volume[i], i+1);
                }

                if (unpacked > packed) {
                    return matrixTable[restVol,i] = unpacked;
                }
                else {
                    return matrixTable[restVol,i] = packed;
                }
            }
            return matrixTable[restVol,i-1];
        }
    }
}
