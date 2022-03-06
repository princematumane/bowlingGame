using System;
using System.Collections.Generic;
using System.Text;

namespace BowlingGame.Core.Interfaces
{
    public interface IContest
    {
        List<IContestant> Contestants { get; set; }
    }
}
