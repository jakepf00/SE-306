﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BITS_API.Models;

namespace BITS_API.Service
{
    public interface IEquipmentService
    {
        IEnumerable<Equipment> GetAll();

        void Add(Equipment e);
    }
}
