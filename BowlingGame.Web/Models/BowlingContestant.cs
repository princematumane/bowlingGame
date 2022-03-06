using BowlingGame.Core.Interfaces;
using BowlingGame.Web.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BowlingGame.Web.Models
{
    public class BowlingContestant : IContestant
    {
        public bool IsInstanceComplete { get; set; }
        public string ContestantName { get; set; }
        public List<IScoreRecord> ScoringData { get; set; }

        public BowlingContestant()
        {
            ScoringData = new List<IScoreRecord>();
        }

        public int GetScore()
        {
            int score = 0;
            var rollIndex = 0;
            for (var frame = 0; frame < 10 ; frame++)
            {
                if (IsStrike(rollIndex))
                {
                    score += GetStrikeScore(rollIndex);
                    rollIndex++;
                }
                else if (IsSpare(rollIndex))
                {
                    score += GetSpareScore(rollIndex);
                    rollIndex += 2;
                }
                else
                {
                    score += GetStandarScore(rollIndex);
                    rollIndex += 2;
                }
            }
            return score;
        }
        private bool IsSpare(int rollIndex)
        {
            return ScoringData[rollIndex].Score + ScoringData[rollIndex + 1].Score == 10;
        }
        private bool IsStrike(int rollIndex)
        {
            return ScoringData[rollIndex].Score == 10;
        }

        private int GetStandarScore(int rollIndex)
        {
            return ScoringData[rollIndex].Score + ScoringData[rollIndex + 1].Score;
        }

        private int GetStrikeScore(int rollIndex)
        {
            return ScoringData[rollIndex].Score + ScoringData[rollIndex + 1].Score + ScoringData[rollIndex + 2].Score;
        }
        private int GetSpareScore(int rollIndex)
        {
            return ScoringData[rollIndex].Score + ScoringData[rollIndex + 1].Score + ScoringData[rollIndex + 2].Score;
        }


    }
}
